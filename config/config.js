require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
  // test: {
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   database: "database_test",
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT,
  //   dialect: "mysql"
  // },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql"
  }
}
