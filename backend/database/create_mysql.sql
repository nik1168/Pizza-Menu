-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema pizza
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `pizza`;
-- -----------------------------------------------------
-- Schema pizza
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pizza` DEFAULT CHARACTER SET utf8 ;
USE `pizza` ;

-- -----------------------------------------------------
-- Table `pizza`.`pizza`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pizza`.`pizza` (
                                               `id` INT NOT NULL AUTO_INCREMENT,
                                               `name` VARCHAR(100) NULL,
                                               PRIMARY KEY (`id`))
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pizza`.`topping`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pizza`.`topping` (
                                                 `id` INT NOT NULL AUTO_INCREMENT,
                                                 `name` VARCHAR(100) NULL,
                                                 PRIMARY KEY (`id`))
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pizza`.`pizza_has_topping`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pizza`.`pizza_has_topping` (
                                                           `id` INT NOT NULL AUTO_INCREMENT,
                                                           `pizza_id` INT NOT NULL,
                                                           `topping_id` INT NOT NULL,
                                                           PRIMARY KEY (`id`),
                                                           INDEX `fk_pizza_has_topping_topping1_idx` (`topping_id` ASC),
                                                           INDEX `fk_pizza_has_topping_pizza_idx` (`pizza_id` ASC),
                                                           CONSTRAINT `fk_pizza_has_topping_pizza`
                                                               FOREIGN KEY (`pizza_id`)
                                                                   REFERENCES `pizza`.`pizza` (`id`),
                                                           CONSTRAINT `fk_pizza_has_topping_topping1`
                                                               FOREIGN KEY (`topping_id`)
                                                                   REFERENCES `pizza`.`topping` (`id`))
    ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
