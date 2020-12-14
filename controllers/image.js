  const image = (req, resp, db, bcrypt) => {
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
}

const { CLARIFAI_KEY } = require('../config');

const clar_app = new Clarifai.App(
  // have to save this in an environment variable
  // https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5
  // https://create-react-app.dev/docs/adding-custom-environment-variables/
  {
    apiKey: CLARIFAI_KEY
  }
)

const clarifaiModel = (req, resp) => {
  const { image_url} = req.body;
  clar_app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      image_url)
    .then(model => resp.json(model))
    .catch(error => resp.status(400).json('Unable to get image'));
}

module.exports = { 
    image,
    clarifaiModel
}