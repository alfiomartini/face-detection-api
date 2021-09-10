const { CLARIFAI_KEY } = require('../config');
const Clarifai = require('clarifai');

const clarifai_app = new Clarifai.App(
  // have to save this in an environment variable
  // https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5
  // https://create-react-app.dev/docs/adding-custom-environment-variables/
  {
    apiKey: CLARIFAI_KEY
  }
)

const clarifaiModel = (req, resp) => {
  const { image_url} = req.body;
  clarifai_app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      image_url)
    .then(model => resp.json(model))
    .catch(error => resp.status(400).json('Unable to get image model'));
}

module.exports = { 
  clarifaiModel
}