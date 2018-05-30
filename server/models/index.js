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
      cb (err, null);
    } else {
      cb(null, result);
    }
  });
};

const checkUserExists = (email, cb) => {

  let query = 'SELECT email FROM users WHERE email = ?';
  db.connection.query(query, email, function(err, result, fields) {
    if (err) {
      cb (err, null);
    } else {
      cb(null, result);
    }
  });

};

const fetchUser = (email, cb) => {
  let query = 'SELECT * FROM users WHERE email = ?';

  db.connection.query(query, email, (err, result, fields) => {
    if (err) {
      cb (err, null);
    } else {
      cb(null, result);
    }
  });
};

const createFile = (req, cb) => {
  let fileDetails = {
    file_name: req.file.originalname,
    file_ext: req.file.contentType,
    folder_id: 0, //not sure what this will be yet
    created_by_user_id: req.session.userId,
    s3_objectId: req.file.key,
    acl: req.file.acl,
  };

  let query = 'INSERT INTO files SET ?';

  db.connection.query(query, fileDetails, function(err, result, fields) {
    if (err) {
      cb (err, null);
    } else {
      cb(null, result);
    }
  });
};

const createFolder = (folder, cb) => {

  let folderDetails = {
    folder_name: folder.folder_name,
    parent_folderid: folder.parent_folderid,
    full_path: folder.full_path,
    created_by_user_id: folder.created_by_user_id,
    acl: folder.acl
  };

  let query = 'INSERT INTO folders SET ?';

  db.connection.query(query, folderDetails, function(err, result, fields) {
    if (err) {
      cb (err, null);
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

