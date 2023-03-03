CREATE DATABASE gymCorp; 

CREATE TABLE facility(
    facility_ID SERIAL PRIMARY KEY,
    faciltiyName VARCHAR(255),
    capacity INT,
    availability VARCHAR(255),
)

CREATE TABLE activity(
    activityID INT NOT NULL PRIMARY KEY,
    facilityID INT NOT NULL,
    activityName VARCHAR(50) NOT NULL,
    facilityName VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY (facilityID) REFERENCES facility(facilityID)
)