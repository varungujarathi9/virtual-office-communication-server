// "use strict";
const mongoHelper = require("./helpers/MongoHelper")
const express = require('express')
const cors = require('cors')
const configs = require("./configs.json")

const app = express()
const port = process.env.PORT || 8000
const userCollection = configs["mongo-user-collection"]

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
  res.send("Virtual Office Server")
})

// user registration endpoint
app.post('/register',(req,res)=>{
  console.log("Request: " + JSON.stringify(req.body))
  registrationResponse = {}
  // checking if the request body has required fields
  if(req.body.hasOwnProperty('firstname') && req.body.hasOwnProperty('lastname') && req.body.hasOwnProperty('username') && req.body.hasOwnProperty('email') && req.body.hasOwnProperty('password')){

    try{
      // check if username is already taken
      if (mongoHelper.exists("username", req.body["username"], "users") == false){
        // check if email is already taken
        if(mongoHelper.exists("email", req.body["email"], "users") == false){
          try{
            // insert into the DB
            mongoHelper.insert(req.body, userCollection)
            registrationResponse["status"] = "successful"
          }
          catch(err){
            console.log(err)
            registrationResponse["status"] = "unsuccessful"
            registrationResponse["reason"] = err
          }
        }
        else{
          registrationResponse["status"] = "unsuccessful"
          registrationResponse["reason"] = "email already exists"
        }
      }
      else{
        registrationResponse["status"] = "unsuccessful"
        registrationResponse["reason"] = "username already exists"
      }
    }
    catch{
      console.log(err)
      registrationResponse["status"] = "unsuccessful"
      registrationResponse["reason"] = err
    }
  }
  else{
    registrationResponse["status"] = "unsuccessful"
    registrationResponse["reason"] = "incorrect form data"
  }
  console.log("Response: " + JSON.stringify(registrationResponse))
  res.send(registrationResponse)
})

// user login endpoint
app.post('/login',(req,res)=>{
  console.log("Request : " + JSON.stringify(req.body))
  var loginResponse = {}
  if(req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')) {
    try {
      if(mongoHelper.exists("username",req.body["username"],"users") == true){
        if(mongoHelper.exists("password",req.body["password"],"users") == true){
          loginResponse["status"] = "successful"
        }
        else{
          //  password is incorrect
          loginResponse["status"] = "unsuccessful"
          loginResponse["reason"] = "password incorrect"
        }
      }
      else{
        // username does not exists
        loginResponse["status"] = "unsuccessful"
        loginResponse["reason"] = "invalid username"
      }
    }
    catch(err) {
      loginResponse["status"] = "unsuccessful"
      loginResponse["reason"] = err
    }
  }
  else{
    // the request body doesnt have all parameters for this endpoint
    loginResponse["status"] = "unsuccessful"
    loginResponse["reason"] = "incorrect form data"
  }

  // send response
  res.send(loginResponse)
})

//  group details
app.post('/get-all-groups',(req,res)=>{
  console.log("Request : " + JSON.stringify(req.body))
  var getAllGroupsResponse = {}
  if(req.body.hasOwnProperty('username')) {
    try {
      if(mongoHelper.exists("username",req.body["username"],"users") == true){
        mongoHelper.find("username", req.body["username"])
        getAllGroupsResponse["status"] = "successful"
      }
      else{

      }
    }
    catch(err) {
      getAllGroupsResponse["status"] = "unsuccessful"
      getAllGroupsResponse["reason"] = err
    }
  }
  else{
    // the request body doesnt have all parameters for this endpoint
    getAllGroupsResponse["status"] = "unsuccessful"
    getAllGroupsResponse["reason"] = "incorrect form data"
  }
})

app.listen(port, () => {
  console.log(`App listening at ${port}`)
})