const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Booking')
.then(()=>{
  console.log('DataBase Connected Succesfully')
})
.catch((err)=>{
  console.log('DataBase is Not Connected')
  console.log(err)
})