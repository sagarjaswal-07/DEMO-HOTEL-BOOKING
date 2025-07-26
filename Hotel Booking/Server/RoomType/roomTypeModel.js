const mongoose = require('mongoose');
const roomTypeSchema = new mongoose.Schema({
  roomTypeName : {type:String,default:null},
  description : {type:String,default:null},
  status : {type:String,default:'Active'},
  createdAt : {type:Date,default:Date.now()},
})

module.exports = new mongoose.model('roomTypes',roomTypeSchema);