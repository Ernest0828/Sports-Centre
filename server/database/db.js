import { Sequelize } from "sequelize";

const db = new Sequelize("gymCorp", "postgres", "hogwarts6393", 
{
  host : "localhost",
  dialect : "postgres",
  port : 5432
});

export default db;