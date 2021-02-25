# A Node Server for the Face Detection App

This is a server written in Node.js for the Face Detection App. The server implements the backend database
needed to store information about users (using PostgreSQL) and also encapsulate private keys needed to
access the Clarifai API. The server is comprised of following endpoints:

- POST /register: Sign up a new user and returns JSON data about new user (name, email, number of entries and
  sign up date).

`curl -X POST -H "Content-Type: application/json" -d '{"email":"johndoe@gmail.com", "password":"hello"}' https://facedet-api.herokuapp.com/register`

- POST /signin: Logs in the user and returns basic JSON data about the user.

`curl -X POST -H "Content-Type: application/json" -d '{"email":"johndoe@gmail.com", "password":"hello"}' https://facedet-api.herokuapp.com/signin`

- POST /model: If human faces are detected, it returns the coordinate locations of those faces with a bounding box.
  The returned ‘bounding_box’ values are the coordinates of the box outlining each face within the image

`curl -X POST -H "Content-Type: application/json" -d '{"image_url":"https://www.sciencenewsforstudents.org/wp-content/uploads/2019/11/860_main_beauty.png"}' https://facedet-api.herokuapp.com/model`

- PUT /entries: Increments the number of image entries of user denoted by email data.

`curl -X POST -H "Content-Type: application/json" -d '{"email":"johndoe@gmail.com"}' https://facedet-api.herokuapp.com/entries`
