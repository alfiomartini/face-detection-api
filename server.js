const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// password hashing
// https://www.codeproject.com/Articles/704865/Salted-Password-Hashing-Doing-it-Right
// https://crackstation.net/hashing-security.htm

// middleware to access req.body
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let users_count = 2;

const database = {
  users:[
    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    },
    {
      id: 2,
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    }
  ],
  login:[
  ]
}

app.get('/', (req, resp) => {
  resp.json(database.users);
});

const signin = (req, resp)=>{
  console.log(req.body);
  const { email, password} = req.body;
  const user = findUser(email, 'email');
  if (user && user.password === password){
    resp.json('Sign in successfull');
  } else 
  {
    resp.status(400).json('Error in log in.')
  }   
};

app.post('/signin', signin);

const register = (req, resp) => {
  const { users } = database;
  const newUser = req.body;
  newUser.entries = 0;
  users_count++;
  newUser.id = users_count;
  newUser.joined = new Date();
  users.push(newUser);
  resp.json(newUser);
}

app.post('/register', register);

const findUser = (id, key) => {
  // console.log(id,key);
  for (let user of database.users){
    // console.log(id, user[key], id === user[key]);
    if (id === user[key]){
      return user;
    }
  }
  return {}
};

app.get('/profile/:id', (req, resp) => {
  // console.log(req.params);
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