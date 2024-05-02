const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT
    },
    pool: { min: +process.env.MYSQL_POOL_MIN, max: +process.env.MYSQL_POOL_MAX }
  });
  
  module.exports = knex;
  