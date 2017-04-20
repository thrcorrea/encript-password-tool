require('dotenv').config();

const connection = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    supportBigNumbers: true,
    bigNumberStrings: true,
    multipleStatements: true,
    timezone: 'UTC',
    dateStrings: true,
  },
});

module.exports = connection;
