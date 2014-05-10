CREATE DATABASE chat;

USE chat;

CREATE  TABLE IF NOT EXISTS `chat`.`messages` (

  `id` INT NOT NULL AUTO_INCREMENT ,

  `username` VARCHAR(45) NOT NULL ,

  `contents` TEXT NOT NULL ,

  `created_at` DATETIME NULL ,

  `room` VARCHAR(45) NOT NULL ,

  PRIMARY KEY (`id`)

);

-- ---
-- Foreign Keys
-- ---

CREATE SCHEMA IF NOT EXISTS `chat` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;

