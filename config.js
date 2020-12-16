// https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

// https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html

const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  PORT: process.env.PORT,
  CLARIFAI_KEY: process.env.CLARIFAI_KEY,
  PG_DATABASE: process.env.PG_DATABASE
};