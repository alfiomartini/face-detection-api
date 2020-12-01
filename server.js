const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3100;
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
app.use(cors());

let users_count = 0;
let login_users = 0;


app.get('/', (req, resp) => {
  resp.json(database);
});

// https://www.codementor.io/@oparaprosper79/understanding-node-error-err_http_headers_sent-117mpk82z8
const signin = (req, resp)=>{
  console.log(req.body);
  const { email, password } = req.body;
  if (email==='' || password==='' || name ===''){
    return resp.json({
      message:'Invalid data',
      status:400
    })
  }
  const userLogin = findLogin(email);
  if (isEmpty(userLogin)){
    return resp.json({
      status: 400,
      message:'User not found.'
    });
  }
  const { hash } = userLogin;
  bcrypt.compare(password, hash, function(err, res) {
    if (res){
      resp.json({
        message: `Login of ${email} was successful`,
        status: 200
      });
    }
    else {
      resp.json({
        message: 'Error in log in.',
        status: 400
      });
    }
  });  
};
app.post('/signin', signin);

const register = (req, resp) => {
  const { users, login } = database;
  const { name, email, password } = req.body;
  if (email==='' || password==='' || name ===''){
    return resp.json({
      message:'Invalid data',
      status:400
    })
  }
  if (!isEmpty(findLogin(email))){
    resp.json({
      message:'User already registered',
      status:400
    })
  } else {
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
    resp.json({
      message:'register user was successful',
      status: 200
    });
  });
  }
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
  console.log(' CORS enable web server listening to port:' + port);
});

/*
 route('/'): GET, 'this is working'
 route('/signin'): POST, success/fail (sensitive info)
 route('/register'): POST, return the new user
 route('/profile/:user_id', GET, return the new user
 route(/image'), PUT, return the updated rank
*/