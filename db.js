const  knex = require('knex');

const { DATABASE_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection:'postgres://sjuchpxsdglslv:fc38b8373747132da269cc38d1f8e32de3ecbd88259c04f6616aaca155718bfe@ec2-52-6-75-198.compute-1.amazonaws.com:5432/damv9mq4qmj66i'
});

module.exports = { db };