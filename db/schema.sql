DROP DATABASE IF EXISTS mandalorian_db;
CREATE database mandalorian_db;

USE mandalorian_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS characters;

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL
   );

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tile VARCHAR(30) NOT NULL,
    credits_salary DECIMAL(10, 0) NOT NULL,
    dept_id INT
);

CREATE TABLE characters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);