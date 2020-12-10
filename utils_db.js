const { db } = require('./db');

function usersSetdb(){
  return db('users')
         .select('*')
}

module.exports = {
  usersSetdb
}