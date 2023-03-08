CREATE DATABASE gymCorp; 

CREATE TABLE customers(
    customer_ID SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE activities(
    activity_ID SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE staff(
    staff_ID int PRIMARY KEY,
    staff_Name VARCHAR(255),
    staff_Number int,
    staff_Email VARCHAR(255),
    staff_Title VARCHAR(255)
);