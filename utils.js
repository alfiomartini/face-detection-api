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

