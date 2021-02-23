// "use strict";
const express = require('express')
const app = express()
const port = 8000

app.use(express.json())

app.get('/',(req,res)=>{
  res.send("Virtual Office Server")
})

app.post('/register',(req,res)=>{
  console.log(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})