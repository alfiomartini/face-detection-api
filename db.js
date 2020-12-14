const  knex = require('knex');

const { PG_DATABASE } = require('./config')
const db = knex({
  client: 'pg',
  connection:PG_DATABASE
});

module.exports = { db };