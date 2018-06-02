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
    folder_id: req.session.folderId ? req.session.folderId : 0,
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
    folder_id: req.session.folderId ? req.session.folderId : 0,
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

const getFiles = (userId, folderId, cb) => {
  const query = 'SELECT id, name, s3_objectId, is_public, created_on as lastModified, is_folder FROM files WHERE user_id = ? AND folder_id = ? ORDER BY is_folder DESC, name';
  db.connection.query(query, [userId, folderId], (err, result, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const searchFiles = (userId, keyword, cb) => {
  keyword = '%' + keyword + '%';

  const query = 'SELECT id, name, s3_objectId, is_public, created_on as lastModified, is_folder FROM files WHERE user_id = ? AND name LIKE ? ORDER BY is_folder DESC, name';

  db.connection.query(query, [userId, keyword], (err, result, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const searchPath = (userId, folderId, cb) => {

  const query = '(SELECT SF.folder_id, F.name FROM (SELECT folder_id FROM files WHERE user_id = ? AND id IN (SELECT folder_id FROM files WHERE user_id = ? AND id IN (SELECT folder_id FROM files WHERE user_id = ?  AND id = ? )) UNION (SELECT folder_id FROM files WHERE user_id = ? AND id IN (SELECT folder_id FROM files WHERE user_id = ?  AND id = ? )) UNION (SELECT folder_id FROM files WHERE user_id = ? AND id = ?)) AS SF LEFT JOIN files As F ON SF.folder_id = F.id)  UNION (SELECT id, name FROM files WHERE user_id = ? AND id = ? )';

  const data = [userId, userId, userId, folderId, userId, userId, folderId, userId, folderId, userId, folderId];

  db.connection.query(query, data, (err, result, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
}

const changeFilePermissions = (id, permission, cb) => {

  let query = 'UPDATE files SET is_public = ? WHERE id = ?';

  db.connection.query(query, [permission, id], (err, result, fields) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};


exports.changeFilePermissions = changeFilePermissions;
exports.checkUserExists = checkUserExists;
exports.createFile = createFile;
exports.createFolder = createFolder;
exports.createUser = createUser;
exports.fetchUser = fetchUser;
exports.getFiles = getFiles;
exports.searchFiles = searchFiles;
exports.searchPath = searchPath;

