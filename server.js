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

// password hashing
// https://www.codeproject.com/Articles/704865/Salted-Password-Hashing-Doing-it-Right
// https://crackstation.net/hashing-security.htm

const bcrypt = require('bcryptjs');
// const { json } = require('body-parser');
// const { response } = require('express');
const SALT_LEN = 10;

// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
 
 
// https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data

// app.use(express.urlencoded({extended:false}));

//  Returns middleware that only parses json. A new body object containing the parsed data is populated on the request object  (i.e. req.body).

app.use(express.json());

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
