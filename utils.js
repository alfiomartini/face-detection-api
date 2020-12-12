const database = {
  users:[
  ],
  login:[
  ]
}

let users_count = 0;
let login_users = 0;

const usersSet = () => {
  const changedUsers = database.users.map(user => {
     user.password='';
     return user;
  });
  return changedUsers;
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
  usersSet,
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
//   id: 3,
//   name: 'Alfio',
//   email: 'alfio.martini@gmail.com',
//   password: easy,
//   entries: 0,
//   joined: new Date()
// }
//   id: 4,
//   name: 'Cathy',
//   email: 'cathy@gmail.com',
//   password: pass01,
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