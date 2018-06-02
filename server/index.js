var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models/index.js');
var path = require('path');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var app = express();
var AWS = require('aws-sdk');
var config = require('./config.js');

var multer = require('multer');
var multerS3 = require('multer-s3');
const ABLEBOX_BUCKET = 'ablebox';
const S3_API_VER = '2006-03-01';

var app = express();

var s3 = new AWS.S3({
  accessKeyId: config.keys.accessKeyId,
  secretAccessKey: config.keys.secretAccessKey,
  Bucket: ABLEBOX_BUCKET,
  apiVersion: S3_API_VER
});


var deleteObject = function(objectKey) {
  var params = {
    Bucket: ABLEBOX_BUCKET,
    Key: objectKey
  };
  s3.deleteObject(params, function(err, data) {
    if (err) {
      res.status = 400;
      res.write('ERROR DELETING OBJECT');
      res.end();
    }
    else {
      res.status = 200;
      res.write('OK');
      res.end();
    }
  });
};

var getObject = function(objectKey) {
  var params = {
    Bucket: ABLEBOX_BUCKET,
    Key: objectKey
  };
  s3.getObject(params, function(err, data) {
    if (err) {
      res.status = 400;
      res.write("ERROR GETTING OBJECT");
      res.end();
    } else {
      return data;
    }
    //data example:
    /*
    data = {
     AcceptRanges: "bytes",
     ContentLength: 3191,
     ContentType: "image/jpeg",
     ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"",
     LastModified: <Date Representation>,
     Metadata: {
     },
     TagCount: 2,
     VersionId: "null"
    }
    */
  });
}

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: ABLEBOX_BUCKET,
    acl: 'private',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, `${req.session.user}/${file.originalname}`);
    }
  })
});

const createFolder = function(req, res, next) {
  //TODO: need to check for duplicates first before going to aws
  let params = {
    ACL: "private",
    Bucket: ABLEBOX_BUCKET,
    Key: `${req.session.user}/${req.body.folderName}/`,
  };
  s3.putObject(params, function(err, data) {
    if (err) {
      res.status = 400;
      res.write("ERROR CREATING OBJECT");
      res.end();
    } else {
      next();
    }
    /*
    data = {
    ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"",
    VersionId: "Kirh.unyZwjQ69YxcQLA8z4F5j3kJJKr"
    }
    */
  });
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/../client/dist'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

var checkUser = (req, res, next) => {
  if(req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

const verifyFilePermissions = (req, res, next) => {

  db.verifyFilePermissions(req.params.id, (err, result) => {
    if (result && (result[0].user_id === req.session.user || result[0].is_public === 1)) {
      next();
    } else {
      res.redirect(500, '/');
    }
  });

};

app.get('/file/:id', verifyFilePermissions, (req, res) => {
  getObject(req.params.id);
});

app.get('/home', checkUser, (req, res) => {
  // delete folderId from sesh if home route (root folder) is hit, as folder_id in db for root is NULL
  req.session.folderId = 0;
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  db.fetchUser(email, (err, result) => {
    if (err) {
      res.redirect(500, '/login');
    } else if (!result.length) {
      res.redirect(401, '/login');
    } else {
      bcrypt.compare(password, result[0].password, (err, match) => {
        if (!match) {
          res.redirect(401, '/signin');
        } else {
          req.session.regenerate(() => {
            req.session.folderId = 0;
            req.session.user = result[0].id;
            res.redirect('/home');
          });
        }
      })
    }
  });
});

app.post('/signup', (req, res) => {
  let userData = req.body;
  bcrypt.hash(userData.password, null, null, (err, hash) => {
    if (err) {
      res.redirect(500, '/signup');
    }
    userData.password = hash;
  });
  db.checkUserExists(userData.email, (err, result) => {
    if (err) {
      res.redirect(500, '/signup');
    }
    if (result.length) {
      res.status(500).send('username already exists!');
    } else {
      db.createUser(userData, (err, result) => {
        if(err) {
          res.redirect(500, '/signup');
        } else {
          req.session.regenerate(() => {
            req.session.user = result.insertId;
            res.redirect('/home');
          });
        }
      });
    }
  });
});

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.clearCookie('connect.sid');
        res.redirect('/login');
      }
    });
  }
});

app.post('/upload', upload.single('file'), function(req, res, next) {
  //TODO: validate user email/userid against the sessionid
  db.createFile(req, function(err, result) {
    if (err) {
      res.status = 404;
      res.write('UNABLE TO UPLOAD FILE');
      res.end();
    } else {
      res.status = 200;
      res.write('Successfully uploaded ' + req.file.length + ' files!');
      res.end();
    }
  });
});

app.get('/getfiles', checkUser, function(req, res) {
  let folderId = req.session.folderId;
  db.getFiles(req.session.user, folderId, function(err, result) {
    if (err) {
      res.status = 404;
      res.write(err);
      res.end();
    } else {
      res.status = 200;
      res.write(JSON.stringify(result));
      res.end();
    }
  });
});

app.get('/folder/:folderid', checkUser, function(req, res) {
  let folderId = req.params.folderid;
  let user_id = req.session.user;
  if(folderId) {
    db.getFiles(user_id, folderId, function(err, result) {
      if (err) {
        res.status = 404;
        res.write(err);
        res.end();
      } else {
        res.status = 200;
        req.session.folderId = folderId;
        res.write(JSON.stringify(result));
        res.end();
      }
    });
  }
});

app.post('/searchfiles', checkUser, function(req, res) {
  let keyword = req.body.keyword;
  let user_id = req.session.user;
  db.searchFiles(user_id, keyword, function(err, result) {
    if (err) {
      res.status = 404;
      res.write(err);
      res.end();
    } else {
      res.status = 200;
      res.write(JSON.stringify(result));
      res.end();
    }
  });
});

app.post('/createFolder', createFolder, function(req, res) {
  db.createFolder(req, function(err, result) {
    if (err) {
      res.status = 404;
      res.write('UNABLE TO CREATE FOLDER');
      res.end();
    } else {
      res.status = 200;
      res.write(JSON.stringify({folder_id: result.insertId}));
      res.end();
    }
  });
});

app.post('/share', (req, res) => {
  let cb = (err, result) => {
    if (err) {
      res.redirect(500, '/home');
    } else {
      res.status(201).end();
    }
  });
  // if user exists
  //  update collab table
  // else
  //  update pending table
  if (checkUserExists)
    db.shareFileExistingUser(file, email, cb);
    db.shareFilePendingUser(file, email, cb);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
