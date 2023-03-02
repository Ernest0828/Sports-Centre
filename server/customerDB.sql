CREATE DATABASE gymCorp;

CREATE TABLE customer(
    custId uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    custName VARCHAR(255) NOT NULL,
    custNumber INT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);