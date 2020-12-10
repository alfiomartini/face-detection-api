const  knex = require('knex');

// initialize database, a query builder object
// https://www.postgresqltutorial.com/postgresql-foreign-key/
const db = knex({ 
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'galileu02',
    database : 'smart_brain'
  }
});

module.exports = { db };