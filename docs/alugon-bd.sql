-- MySQL Script generated by MySQL Workbench
-- Mon Jan 20 23:58:42 2025
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema alugon
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema alugon
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `alugon` DEFAULT CHARACTER SET utf8 ;
USE `alugon` ;

-- -----------------------------------------------------
-- Table `alugon`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alugon`.`usuario` (
  `id` INT NOT NULL,
  `CPF` VARCHAR(14) NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `telefone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alugon`.`espaco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alugon`.`espaco` (
  `id` INT NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  `disponivel` TINYINT NOT NULL,
  `descricao` VARCHAR(600) NOT NULL,
  `valor` FLOAT NOT NULL,
  `dono` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `dono_idx` (`dono` ASC) VISIBLE,
  CONSTRAINT `dono`
    FOREIGN KEY (`dono`)
    REFERENCES `alugon`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `alugon`.`aluguel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alugon`.`aluguel` (
  `id` INT NOT NULL,
  `espaco_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `data_inicio` DATETIME NOT NULL,
  `data_fim` DATETIME NOT NULL,
  `valor_total` FLOAT NOT NULL,
  INDEX `espaco_id_idx` (`espaco_id` ASC) VISIBLE,
  INDEX `usuario_id_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `espaco_id`
    FOREIGN KEY (`espaco_id`)
    REFERENCES `alugon`.`espaco` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `alugon`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
