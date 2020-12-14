const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  PORT: process.env.PORT,
  CLARIFAI_KEY: process.env.CLARIFAI_KEY,
  DATABASE_URL: process.env.PG_DATABASE
};