var db = require('../db/index.js');

const createUser = (user, cb) => {

  var query = `INSERT INTO users SET
                username = '${user.username}',
                password = '${user.password}',
                salt = '${user.salt}',
                birthyear = '${user.birthyear}',
                email = '${user.email}',
                firstname = '${user.firstname}',
                lastname = '${user.lastname}'
                ;`
  console.log('createUser query>>>>' + query);
  db.connection.query(query, function(error, results, fields) {
    // console.log('createUser results>>>' + results);
    // console.log('createUser error>>>' + error);
    if(error) {cb(error, null);}
    if(results) {cb(null, results);}
  });
};

const checkUserExists = (user, cb) => {

  var query = `SELECT username FROM users WHERE
              username = '${user.username}'
              ;`
  console.log('checkUserExists query>>>>' + query);
  db.connection.query(query, function(error, results, fields) {
    // console.log('checkUserExists results>>>' + results);
    // console.log('checkUserExists error>>>' + error);
    if(error) {cb(error, null);}
    if(results) {cb(null, results);}
  });

};

exports.createUser = createUser;
exports.checkUserExists = checkUserExists;