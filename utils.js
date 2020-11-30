const database = {
  users:[
  ],
  login:[
  ]
}

const findUser = (id, key) => {
  for (let user of database.users){
    if (id === user[key]){
      return user;
    }
  }
  return {}
};

const findLogin = (email) => {
  for (let log of database.login){
    if (email === log.email){
      return log;
    }
  }
  return {}
};

function isEmpty(obj) {
  for(let prop in obj) {
    if (obj.hasOwnProperty(prop))
        return false;
  }
  return true;
}

module.exports = {
  isEmpty,
  findLogin,
  findUser, 
  database
}

// {
//   id: 1,
//   name: 'John',
//   email: 'john@gmail.com',
//   password: cookies,
//   entries: 0,
//   joined: new Date()
// },
// {
//   id: 2,
//   name: 'Sally',
//   email: 'sally@gmail.com',
//   password: bananas,
//   entries: 0,
//   joined: new Date()
// }
// {
//   id: 1,
//   email: 'john@gmail.com',
//   hash: ''
// },
// {
//   id: 2,
//   email: 'sally@gmail.com',
//   hash:''
// }