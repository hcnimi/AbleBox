var db = require('../db/index.js');

const createUser = (user, cb) => {

  var query = `INSERT INTO users SET
                password = '${user.password}',
                email = '${user.email}',
                firstname = '${user.firstname}',
                lastname = '${user.lastname}'
                `;

  db.connection.query(query, function(error, results, fields) {
    if(error) {cb(error, null);}
    if(results) {cb(null, results);}
  });
};

const checkUserExists = (user, cb) => {

  var query = 'SELECT email FROM users WHERE email = ?';
  db.connection.query(query, user.email, function(error, results, fields) {
    if(error) {cb(error, null);}
    if(results) {cb(null, results);}
  });

};

const fetchUser = (useremail, cb) => {
  let sql = 'SELECT * FROM users WHERE email = ?';

  db.connection.query(sql, useremail, (err, result, fields) => {
    if (err) { cb (err, null) }
    if (result) { cb(null, result) }
  })
};

const createFile = (file, cb) => {

  var query = `INSERT INTO files SET
                file_name = '${file.file_name}',
                file_ext = '${file.file_ext}',
                folder_id = '${file.folder_id}',
                created_by_user_id = '${file.created_by_user_id}',
                s3_objectId = '${file.s3_objectId}',
                acl = '${file.acl}'
                `;

  db.connection.query(query, function(error, results, fields) {
    if(error) {cb(error, null);}
    if(results) {cb(null, results);}
  });
};

const createFolder = (folder, cb) => {

  var query = `INSERT INTO files SET
                folder_name = '${folder.folder_name}',
                parent_folderid = '${folder.parent_folderid}',
                full_path = '${folder.full_path}',
                created_by_user_id = '${folder.created_by_user_id}',
                acl = '${folder.acl}'
                `;

  db.connection.query(query, function(error, results, fields) {
    if(error) {cb(error, null);}
    if(results) {cb(null, results);}
  });
};

exports.fetchUser = fetchUser;
exports.createUser = createUser;
exports.checkUserExists = checkUserExists;
exports.createFile = createFile;
exports.createFolder = createFolder;