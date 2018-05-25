var db = require('../db/index.js');

const createUser = (user, cb) => {

  var query = `INSERT INTO users SET
                password = '${user.password}',
                email = '${user.email}',
                firstname = '${user.firstname}',
                lastname = '${user.lastname}'
                ;`
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

const fetchUser = (username, cb) => {
  let sql = 'SELECT * FROM users WHERE email = ?';

  db.connection.query(sql, [username], (err, result, fields) => {
    if (err) { cb (err, null) }
    if (result) { cb(null, result) }
  })
};

exports.fetchUser = fetchUser;
exports.createUser = createUser;
exports.checkUserExists = checkUserExists;