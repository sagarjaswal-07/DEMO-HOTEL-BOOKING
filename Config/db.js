const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>{
  console.log('DataBase Connected Succesfully')
})
.catch((err)=>{
  console.log('DataBase is Not Connected')
  console.log(err)
})