DROP DATABASE IF EXISTS `ablebox`;

CREATE DATABASE `ablebox`;

USE `ablebox`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE users (
  id integer AUTO_INCREMENT,
  email varchar(200) NOT NULL,
  password char(60) binary NOT NULL,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS `files`;

CREATE TABLE files (
  id integer AUTO_INCREMENT,
  file_name varchar(200) NOT NULL,
  file_ext varchar(200) NOT NULL,
  folder_id integer NOT NULL,
  created_by_user_id integer NOT NULL,
  created_on DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  s3_objectId varchar(400) NOT NULL,
  acl varchar(100) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS `folders`;

CREATE TABLE folders (
  id integer AUTO_INCREMENT,
  folder_name varchar(200) NOT NULL,
  parent_folderid integer NOT NULL,
  full_path varchar(1000) NOT NULL,
  acl varchar(100) NOT NULL,
  created_by_user_id integer NOT NULL,
  created_on DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

ALTER TABLE files ADD FOREIGN KEY (folder_id) REFERENCES folders (id);
ALTER TABLE files ADD FOREIGN KEY (created_by_user_id) REFERENCES users (id);
ALTER TABLE folders ADD FOREIGN KEY (created_by_user_id) REFERENCES users (id);

