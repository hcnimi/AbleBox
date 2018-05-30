var db = require('../db/index.js');

const createUser = (user, cb) => {

  let userDetails = {
    password:  user.password,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname
  };

  let query = 'INSERT INTO users SET ?';

  db.connection.query(query, userDetails, function(error, results, fields) {
    if(error) {cb(error, null);}
    if(results) {cb(null, results);}
  });
};

const checkUserExists = (email, cb) => {

  let query = 'SELECT email FROM users WHERE email = ?';
  db.connection.query(query, email, function(error, results, fields) {
    if(error) {cb(error, null);}
    if(results) {cb(null, results);}
  });

};

const fetchUser = (email, cb) => {
  let query = 'SELECT * FROM users WHERE email = ?';

  db.connection.query(query, email, (err, result, fields) => {
    if (err) { cb (err, null) }
    if (result) { cb(null, result) }
  })
};

const createFile = (file, cb) => {

  let fileDetails = {
    file_name: file.file_name,
    file_ext: file.file_ext,
    folder_id: file.folder_id,
    created_by_user_id: file.created_by_user_id,
    s3_objectId: file.s3_objectId,
    acl: file.acl
  };

  let query = 'INSERT INTO files SET ?';

  db.connection.query(query, fileDetails, function(error, results, fields) {
    if(error) {cb(error, null);}
    if(results) {cb(null, results);}
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

  db.connection.query(query, folderDetails, function(error, results, fields) {
    if(error) {cb(error, null);}
    if(results) {cb(null, results);}
  });
};

exports.fetchUser = fetchUser;
exports.createUser = createUser;
exports.checkUserExists = checkUserExists;
exports.createFile = createFile;
exports.createFolder = createFolder;