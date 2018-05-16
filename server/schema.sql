DROP DATABASE IF EXISTS `ablebox`;

CREATE DATABASE `ablebox`;

USE `ablebox`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE users (
  id integer AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(500) NOT NULL,
  salt varchar(300) NOT NULL,
  birthyear integer NOT NULL,
  email varchar(200) NOT NULL,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

