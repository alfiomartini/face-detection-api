const  knex = require('knex');

const { PG_DATABASE } = require('./config')

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

module.exports = { db };