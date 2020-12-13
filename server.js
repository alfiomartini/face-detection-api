const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3100;
const { usersSetdb } = require('./utils_db');
const { db } = require('./db');

// testing
// db.select('*').from('users')
// .then(rows => console.log('users rows',rows));

// https://stackoverflow.com/questions/13023361/how-does-node-bcrypt-js-compare-hashed-and-plaintext-passwords-without-the-salt
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');
const { response } = require('express');
const SALT_LEN = 10;

// password hashing
// https://www.codeproject.com/Articles/704865/Salted-Password-Hashing-Doing-it-Right
// https://crackstation.net/hashing-security.htm

// middleware to access req.body
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, resp) => {
  usersSetdb()
  .then(rows => resp.json(rows))
  .catch(error => response.status(404).json('unable to fetch users'));
});

// https://www.codementor.io/@oparaprosper79/understanding-node-error-err_http_headers_sent-117mpk82z8
const signin = (req, resp) => {
  const { email, password } = req.body;
  if (password==='' || email ===''){
    return resp.status(404).json({
      message:'Invalid password or email'
    })
  }
  db('login')
  .select('hash_pass')
  .where({
    email:email
  })
  .then(rows => {
    const  hash  = rows[0].hash_pass;
    const validPass = bcrypt.compareSync(password, hash);
    if (validPass){
      db('users')
        .select('*')
        .where({
          email:email
        })
        .then(rows => {
          const currentUser = rows[0];
          resp.status(200).json({
            message: `Login of ${email} was successful`,
            user:currentUser
          });
        })
        .catch(error => resp.status(404).json({message:'Error in fetching user.'}));
      }
      else {
        resp.status(404).json({
          message: 'Invalid user or password.'
        });
      } 
  })
  .catch(data => {
    resp.status(404).json({
    message:'Invalid  email or password.'
    })
  });
};
app.post('/signin', signin);

const register = (req, resp) => {
  const { name, email, password } = req.body;

  if (email==='' || password==='' || name ===''){
    return resp.status(400).json({
      message:'Invalid data'
    })
  }

  const salt = bcrypt.genSaltSync(SALT_LEN);
  const hash = bcrypt.hashSync(password, salt);
  
  // db.transaction also returns a promise
  db.transaction(trx => {
    db('login')
    .returning('email')
    .insert({
      email:email.toLowerCase(),
      hash_pass:hash
    })
    .transacting(trx)
    .then(email => {
      // console.log('hey trx email', email);
      return db('users')
        .returning('*')
        .insert({
          email:email[0].toLowerCase(),
          name:name.toLowerCase(),
          joined:new Date()
        })
        .transacting(trx)
        .then(rows => {
          const user = rows[0];
          return resp.status(200).json({
            message:'Sign up was successful.',
            user: user
            })
          })
        // .catch(() => {throw new Error ('problem with the transaction')});
    })
    .then(trx.commit)
    // trx.rollback must be called with a rejected promise?
    .catch(trx.rollback)
  })
  .then(data => console.log('Transaction register complete.'))
  .catch(error => {
    console.log('error transaction =', error.detail);
    resp.status(400).json({message:'Unable to register this email.'})
  });
}

app.post('/register', register);

app.get('/profile/:id', (req, resp) => {
  let { id } = req.params;
  id = Number(id);
  db('users')
  .select('*')
  .where({
    id:id
  })
  .then(rows => {
    if (rows.length > 0) {
      resp.status(200).json(rows[0])
    } 
    else {
      resp.status(404).json(null);
    }
  })
  .catch(error => resp.status(404).json('unable to get profile'))
});

app.put('/image', (req, resp) => {
  const { email } = req.body;
  db('users')
  .select('*')
  .where({
    email:email
  })
  .then(rows => {
  if (rows.length > 0){
    const user = rows[0]
    const entries = user.entries + 1;
    db('users')
    .update({
      entries: entries
    })
    .where({
      email:email
    })
    .then(() => {
      resp.json(entries);
    })
    .catch(error => {
      console.log('error in update query (image)');
      console.log(error.message);
    })
  }
  else {
    console.log('nothing returned in select (image)');
    resp.json(null);
  }
  })
  .catch(() => console.log('error in select query (image)'))
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