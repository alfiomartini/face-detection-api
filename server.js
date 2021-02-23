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
const { entries, clarifaiModel } = require('./controllers/entries');
const { profile } = require('./controllers/profile');


// https://stackoverflow.com/questions/13023361/how-does-node-bcrypt-js-compare-hashed-and-plaintext-passwords-without-the-salt
const bcrypt = require('bcryptjs');
// const { json } = require('body-parser');
// const { response } = require('express');
const SALT_LEN = 10;

// password hashing
// https://www.codeproject.com/Articles/704865/Salted-Password-Hashing-Doing-it-Right
// https://crackstation.net/hashing-security.htm


app.use(bodyParser.urlencoded({extended:false}));

//  Returns middleware that only parses json and only looks at requests where the Content-Type header 
// matches the typeoption. A new body object containing the parsed data is populated on the request object 
// after the middleware (i.e. req.body).

app.use(bodyParser.json());

// This is CORS-enabled for all origins!'
app.use(cors());

app.get('/', (req, resp) => {
  // usersSetdb()
  // .then(rows => resp.json(rows))
  // .catch(error => {
  //   console.log(error);
  //   resp.status(404).json('unable to fetch users');
  // });
  resp.json('Wellcome to the Face Detection API.')
});

// https://www.codementor.io/@oparaprosper79/understanding-node-error-err_http_headers_sent-117mpk82z8

// Using currying here (amazing) 
// signing(db, bcrypt) is a function that has type (req, resp) => {...}
app.post('/signin', signin(db, bcrypt));

app.post('/model', clarifaiModel);

app.post('/register', (req, resp) => register(req, resp, db, bcrypt));

app.get('/profile/:id', (req, resp) => profile(req, resp, db, bcrypt));

app.put('/entries', (req, resp) => entries(req, resp, db, bcrypt));

app.listen(PORT, () => {
  console.log(' CORS enabled web server listening to port:' + PORT);
});

/*
 route('/'): GET, 'this is working'
 route('/signin'): POST, success/fail (sensitive info)
 route('/register'): POST, return the new user
 route('/profile/:user_id', GET, return the new user
 route(/image'), PUT, return the updated rank
*/