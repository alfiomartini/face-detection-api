const  knex = require('knex');

const { DATABASE_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

module.exports = { db };