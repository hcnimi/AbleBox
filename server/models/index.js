const db = require('../db/index.js');

const createUser = (user, cb) => {
  const userDetails = {
    password:  user.password,
    email: user.email,
    first_name: user.firstname,
    last_name: user.lastname
  };

  const query = 'INSERT INTO users SET ?';

  db.connection.query(query, userDetails, function(err, result, fields) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const checkUserExists = (email, cb) => {
  const query = 'SELECT email FROM users WHERE email = ?';

  db.connection.query(query, email, function(err, result, fields) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const fetchUser = (email, cb) => {
  const query = 'SELECT * FROM users WHERE email = ?';

  db.connection.query(query, email, (err, result, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const createFile = (req, cb) => {
  const fileDetails = {
    name: req.file.originalname,
    folder_id: req.session.folderId,
    file_ext: req.file.contentType,
    user_id: req.session.user,
    s3_objectId: req.file.key
  };

  const query = 'INSERT INTO files SET ?';

  db.connection.query(query, fileDetails, function(err, result, fields) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const createFolder = (req, cb) => {
  const folderDetails = {
    name: req.body.folderName,
    folder_id: req.session.folderId,
    user_id: req.session.user,
    s3_objectId: `${req.session.user}/${req.body.folderName}/`,
    is_folder: 1
  };

  const query = 'INSERT INTO files SET ?';

  db.connection.query(query, folderDetails, function(err, result, fields) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const getFiles = (userId, cb) => {
  const query = 'SELECT id, name, s3_objectId, is_public, created_on as lastModified, is_folder FROM files WHERE user_id = ? ORDER BY is_folder DESC, name';

  db.connection.query(query, userId, (err, result, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const openFolder = (folderId, cb) => {

  let query = 'SELECT id, name, s3_objectId, is_public, created_on as lastModified, is_folder FROM files WHERE folder_id = ? ORDER BY is_folder DESC, name';

  db.connection.query(query, folderId, (err, result, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};


const searchFiles = (keyword, cb) => {
  keyword = '%' + keyword + '%';

  let query = 'SELECT id, name, s3_objectId, is_public, created_on as lastModified, is_folder FROM files WHERE name LIKE ? ORDER BY is_folder DESC, name';

  db.connection.query(query, keyword, (err, result, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const changeFilePermissions = (id, permission, cb) => {
  const query = 'UPDATE files SET is_public = ? WHERE id = ?';

  db.connection.query(query, [permission, id], (err, result, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const verifyFilePermissions = (userId, cb) => {

  const query = 'SELECT created_by_user_id AS user_id, is_public FROM files WHERE id = ?';

  db.connection.query(query, [userId], function(err, result, fields) {
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
exports.openFolder = openFolder;
exports.searchFiles = searchFiles;
exports.createFolder = createFolder;
exports.changeFilePermissions = changeFilePermissions;
