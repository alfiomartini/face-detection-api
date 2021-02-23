# A Node Server for the Face Detection App

This is a server written in Node.js for the Face Detection App. The server implements the backend database
needed to store information about users (using PostgreSQL) and also encapsulate private keys needed to
access the Clarifai API. The server is comprised of following endpoints:

- POST /signin:

`curl -X POST -H "Content-Type: application/json" -d '{"email":"johndoe@gmail.com", "password":"hello"}' https://facedet-api.herokuapp.com/signin`

- POST /register:

`curl -X POST -H "Content-Type: application/json" -d '{"email":"johndoe@gmail.com", "password":"hello"}' https://facedet-api.herokuapp.com/register`

- POST /image :

`curl -X POST -H "Content-Type: application/json" -d '{"email":"johndoe@gmail.com", "password":"hello"}' https://facedet-api.herokuapp.com/image`
