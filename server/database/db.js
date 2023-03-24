import { Sequelize } from "sequelize";

const db = new Sequelize("gymCorp", "postgres", "23072003", 
{
  host : "localhost",
  dialect : "postgres",
  port : 5432
});

export default db;