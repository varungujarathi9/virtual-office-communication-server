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

app.post('/register',(req,res)=>{
  console.log("Request: " + JSON.stringify(req.body))
  registrationResponse = {}
  // checking if the request body has required fields
  if(req.body.hasOwnProperty('firstname') && req.body.hasOwnProperty('lastname') && req.body.hasOwnProperty('username') && req.body.hasOwnProperty('email') && req.body.hasOwnProperty('password')){

    // check if username is already taken
    try{
      if (mongoHelper.exists("username", req.body["username"], "users") == false){
        try{
          mongoHelper.insert(req.body, userCollection)
          registrationResponse["registration-status"] = "successful"
        }
        catch(err){
          console.log(err)
          registrationResponse["registration-status"] = "unsuccessful"
          registrationResponse["reason"] = err
        }
      }
      else{
        registrationResponse["registration-status"] = "unsuccessful"
        registrationResponse["reason"] = "username already exists"
      }
    }
    catch{
      console.log(err)
      registrationResponse["registration-status"] = "unsuccessful"
      registrationResponse["reason"] = err
    }
  }
  else{
    registrationResponse["registration-status"] = "unsuccessful"
    registrationResponse["reason"] = "incorrect form data"
  }
  console.log("Response: " + JSON.stringify(registrationResponse))
  res.send(registrationResponse)
})

app.post('/login',(req,res)=>{
  console.log(req.body)
  res.send({"login-status":"successful"})
})

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})