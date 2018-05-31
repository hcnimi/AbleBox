var db = require('../db/index.js');

const createUser = (user, cb) => {

  let userDetails = {
    password:  user.password,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname
  };

  let query = 'INSERT INTO users SET ?';

  db.connection.query(query, userDetails, function(err, result, fields) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const checkUserExists = (email, cb) => {

  let query = 'SELECT email FROM users WHERE email = ?';
  db.connection.query(query, email, function(err, result, fields) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });

};

const fetchUser = (email, cb) => {
  let query = 'SELECT * FROM users WHERE email = ?';

  db.connection.query(query, email, (err, result, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const createFile = (req, cb) => {
  let fileDetails = {
    file_name: req.file.originalname,
    file_ext: req.file.contentType,
    folder_id: null, //not sure what this will be yet
    created_by_user_id: req.session.user,
    s3_objectId: req.file.key,
    acl: req.file.acl,
  };

  let query = 'INSERT INTO files SET ?';

  db.connection.query(query, fileDetails, function(err, result, fields) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const createFolder = (req, cb) => {

  let folderDetails = {
    folder_name: req.body.folderName,
    parent_folderid: null, //leaving this null for now since for root only
    full_path: `${req.session.user}/${req.body.folderName}/`, //leaving this for root only for now
    created_by_user_id: req.session.user,
    acl: 'private', //private by default
  }

  let query = 'INSERT INTO folders SET ?';

  db.connection.query(query, folderDetails, function(err, result, fields) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const getFiles = (userId, cb) => {
  let query = 'SELECT id, file_name as name, created_on as lastModified FROM files WHERE created_by_user_id = ?';

  db.connection.query(query, userId, (err, result, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};


const searchFiles = (keyword, cb) => {
  keyword = '%' + keyword + '%';
  let query = 'SELECT id, file_name as name, created_on as lastModified FROM files WHERE file_name LIKE ?';
  db.connection.query(query, keyword, (err, result, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

exports.fetchUser = fetchUser;
exports.createUser = createUser;
exports.checkUserExists = checkUserExists;
exports.createFile = createFile;
exports.createFolder = createFolder;
exports.getFiles = getFiles;
exports.searchFiles = searchFiles;
exports.createFolder = createFolder;

