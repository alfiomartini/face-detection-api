const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  PORT: process.env.PORT,
  CLARIFAI_KEY: process.env.CLARIFAI_KEY,
  PG_DATABASE: process.env.PG_DATABASE
};