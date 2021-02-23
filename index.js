"use strict";
import express from 'express'
import { json } from 'express'

const app = express()
const port = 8000

app.use(json())

app.get('/',(req,res)=>{
  res.send("Virtual Office Server")
})

app.post('/register',(req,res)=>{
  console.log(req.body)
})