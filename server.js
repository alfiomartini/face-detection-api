const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { PORT } = require('./config');
const { usersSetdb } = require('./utils_db');
const { db } = require('./db');
const Clarifai = require('clarifai');


const { register } = require('./controllers/register');
const { signin } = require('./controllers/signin');
const { image, clarifaiModel } = require('./controllers/image');
const { profile } = require('./controllers/profile');


// https://stackoverflow.com/questions/13023361/how-does-node-bcrypt-js-compare-hashed-and-plaintext-passwords-without-the-salt
const bcrypt = require('bcryptjs');
// const { json } = require('body-parser');
// const { response } = require('express');
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

// Using currying here (amazing) 
// signing(db, bcrypt) is a function that has type (req, resp) => {...}
app.post('/signin', signin(db, bcrypt));

app.post('/model', clarifaiModel);

app.post('/register', (req, resp) => register(req, resp, db, bcrypt));

app.get('/profile/:id', (req, resp) => profile(req, resp, db, bcrypt));

app.put('/image', (req, resp) => image(req, resp, db, bcrypt));

app.listen(PORT, () => {
  console.log(' CORS enable web server listening to port:' + PORT);
});

/*
 route('/'): GET, 'this is working'
 route('/signin'): POST, success/fail (sensitive info)
 route('/register'): POST, return the new user
 route('/profile/:user_id', GET, return the new user
 route(/image'), PUT, return the updated rank
*/