DROP DATABASE IF EXISTS `ablebox`;

CREATE DATABASE `ablebox`;

USE `ablebox`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE users (
  id integer AUTO_INCREMENT,
  email varchar(200) NOT NULL,
  password varchar(500) NOT NULL,
  salt varchar(300) NOT NULL,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

