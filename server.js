const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { isEmpty, findLogin, findUser, database } = require('./utils');

// https://stackoverflow.com/questions/13023361/how-does-node-bcrypt-js-compare-hashed-and-plaintext-passwords-without-the-salt
const bcrypt = require('bcryptjs');
const SALT_LEN = 10;

// password hashing
// https://www.codeproject.com/Articles/704865/Salted-Password-Hashing-Doing-it-Right
// https://crackstation.net/hashing-security.htm

// middleware to access req.body
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let users_count = 0;
let login_users = 0;


app.get('/', (req, resp) => {
  resp.json(database);
});

const signin = (req, resp)=>{
  console.log(req.body);
  const { email, password } = req.body;
  const userLogin = findLogin(email);
  if (isEmpty(userLogin)){
    resp.status(400).json('User not found.');
  }
  const { hash } = userLogin;
  bcrypt.compare(password, hash, function(err, res) {
    if (res){
      resp.json(`Login of ${email} was successful`);
    }
    else {
      resp.status(400).json('Error in log in.');
    }
  });  
};

app.post('/signin', signin);

const register = (req, resp) => {
  const { users, login } = database;
  const { name, email, password } = req.body;
  users_count++;
  bcrypt.hash(password, SALT_LEN, function(err, hash) {
    // Store hash in your password DB.
    console.log('hash', hash);
    const newUser = {
      id: users_count,
      name: name,
      email: email,
      password:password,
      joined: new Date(),
      entries:0
    };
    users.push(newUser);
    login_users++
    const newLogin = {
      id: login_users,
      email: email,
      hash: hash
    };
    login.push(newLogin);
    resp.json(newUser);
  });
}

app.post('/register', register);

app.get('/profile/:id', (req, resp) => {
  let { id } = req.params;
  id = Number(id);
  resp.json(findUser(id, 'id'));
});

app.put('/image/:id', (req, resp) => {
   let { id } = req.params;
   id = Number(id);
   const user = findUser(id, 'id');
   if (user){
     user.entries += 1;
     resp.json(user.entries);
   }
   else {
     resp.json(null);
   }
});

app.listen(port, () => {
  console.log('listening to port:' + port);
});

/*
 route('/'): GET, 'this is working'
 route('/signin'): POST, success/fail (sensitive info)
 route('/register'): POST, return the new user
 route('/profile/:user_id', GET, return the new user
 route(/image'), PUT, return the updated rank
*/