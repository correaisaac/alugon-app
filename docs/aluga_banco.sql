-- MySQL Script generated by MySQL Workbench

-- Wed Feb  5 22:00:14 2025

-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema aluga_banco
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema aluga_banco
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `aluga_banco` DEFAULT CHARACTER SET utf8 ;
USE `aluga_banco` ;

-- -----------------------------------------------------
-- Table `aluga_banco`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluga_banco`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `CPF` VARCHAR(14) NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `telefone` VARCHAR(14) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `foto` LONGBLOB NOT NULL,
  `conta` VARCHAR(10) NOT NULL,
  `agencia` VARCHAR(5) NOT NULL,
  `ativo` TINYINT DEFAULT 1

  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aluga_banco`.`espaco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluga_banco`.`espaco` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numero` VARCHAR(45) NOT NULL,
  `disponivel` TINYINT NOT NULL,
  `descricao` VARCHAR(600) NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `responsavel` INT NOT NULL,
  `imagem` LONGBLOB NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `ativo` TINYINT DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `dono_idx` (`responsavel` ASC) ,
  CONSTRAINT `dono`
    FOREIGN KEY (`responsavel`)
    REFERENCES `aluga_banco`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aluga_banco`.`contrato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluga_banco`.`contrato` (
  `id` INT NOT NULL AUTO_INCREMENT,

  `data_assinatura` DATETIME NOT NULL,
  `data_venc` DATETIME NOT NULL,
  `status` ENUM('ativo', 'inativo', 'vencido', 'cancelado') NOT NULL,
  `observacao` VARCHAR(45) NOT NULL,
  `modelo_pagamento`ENUM('diário', 'semanal', 'mensal','anual') NOT NULL,
  `condicoes_pagamento` VARCHAR(45) NOT NULL,
  `multa` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aluga_banco`.`aluguel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluga_banco`.`aluguel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `espaco_id` INT NOT NULL,
  `locador` INT NOT NULL,
  `data_inicio` DATETIME NOT NULL,
  `data_fim` DATETIME NOT NULL,
  `valor_total` DECIMAL(10,2) NOT NULL,
  `locatario` INT NOT NULL,
  `encerrado` TINYINT NOT NULL DEFAULT 0,
  `observacao` VARCHAR(45) NOT NULL,
  `contrato_id` INT NOT NULL,
  `status` ENUM('pendente', 'aprovado', 'rejeitado') NOT NULL DEFAULT 'pendente',
  INDEX `espaco_id_idx` (`espaco_id` ASC) ,
  INDEX `usuario_id_idx` (`locador` ASC) ,
  INDEX `fk_aluguel_usuario1_idx` (`locatario` ASC) ,
  PRIMARY KEY (`id`),
  INDEX `fk_aluguel_contrato1_idx` (`contrato_id` ASC) ,
  CONSTRAINT `espaco_id`
    FOREIGN KEY (`espaco_id`)
    REFERENCES `aluga_banco`.`espaco` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `usuario_id`
    FOREIGN KEY (`locador`)
    REFERENCES `aluga_banco`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_aluguel_usuario1`
    FOREIGN KEY (`locatario`)
    REFERENCES `aluga_banco`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_aluguel_contrato1`
    FOREIGN KEY (`contrato_id`)
    REFERENCES `aluga_banco`.`contrato` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aluga_banco`.`fatura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluga_banco`.`fatura` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `valor` DECIMAL(10,2) NOT NULL,
  `data_emissao` DATETIME NOT NULL,
  `data_venc` DATETIME NOT NULL,
  `status` ENUM('Pendente', 'Pago', 'Vencido', 'Cancelado') NOT NULL,
  `descontos` DECIMAL(10,2) NOT NULL,
  `imposto` DECIMAL(10,2) NOT NULL,
  `aluguel_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_fatura_aluguel1_idx` (`aluguel_id` ASC) ,
  CONSTRAINT `fk_fatura_aluguel1`
    FOREIGN KEY (`aluguel_id`)
    REFERENCES `aluga_banco`.`aluguel` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aluga_banco`.`pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluga_banco`.`pagamento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `conta` VARCHAR(10) NOT NULL,
  `agencia` VARCHAR(5) NOT NULL,
  `forma_pagamento` ENUM('Pix', 'Boleto', 'TED', 'Cartão') NOT NULL,
  `num_transacao` VARCHAR(45) NOT NULL,
  `data_pagamento` DATETIME NOT NULL,
  `fatura_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pagamento_fatura1_idx` (`fatura_id` ASC) ,
  CONSTRAINT `fk_pagamento_fatura1`
    FOREIGN KEY (`fatura_id`)
    REFERENCES `aluga_banco`.`fatura` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
