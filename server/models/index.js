var db = require('../db/index.js');

const createUser = (user, cb) => {

  var query = `INSERT INTO users SET
                password = '${user.password}',
                salt = '${user.salt}',
                email = '${user.email}',
                firstname = '${user.firstname}',
                lastname = '${user.lastname}'
                ;`
  db.connection.query(query, function(error, results, fields) {
    if(error) {cb(error, null);}
    if(results) {cb(null, results);}
  });
};

const checkUserExists = (message, cb) => {

  var query = `SELECT email FROM users WHERE
              email = '${message.email}'
              ;`
  db.connection.query(query, function(error, results, fields) {
    if(error) {cb(error, null);}
    if(results) {cb(null, results);}
  });

};

exports.createUser = createUser;
exports.checkUserExists = checkUserExists;