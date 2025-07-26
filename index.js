require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const config = require('./Config/db');

app.use(express.urlencoded({extended:false}))
app.use(express.json({limit:'50mb'}))
const routes = require('./Routes/apiroute')
app.use('/api',routes)

app.get('/',(req,res)=>{
  res.send('Backend is Running')
})

app.listen(port,()=>{
  console.log('My App is Running on Port No.'+' '+port);
})