const mysql = require('mysql');

const connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "ablebox"
});

connection.connect();

module.exports.connection = connection;
