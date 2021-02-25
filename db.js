const  knex = require('knex');
// https://cek.io/blog/2016/10/24/knex-configuration-heroku/

// https://cek.io/blog/2016/10/24/knex-configuration-heroku/

const { PG_DATABASE } = require('./config')

const db = knex({
  client: 'pg',
  // connection to local postgres
  //connection: PG_DATABASE
  // connection to heroku
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

module.exports = { db };