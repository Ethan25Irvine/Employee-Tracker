CREATE DATABASE employeeDB; 
USE employeeDB;
CREATE TABLE department (
	id  INT AUTO_INCREMENT,
	name  VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
    );

CREATE TABLE role (
	id INT AUTO_INCREMENT,
	title VARCHAR(30) NOT NULL,
	salary DECIMAL (10,4),
	department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INT AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INT,
	manager_id INT,
    PRIMARY KEY (id)
);