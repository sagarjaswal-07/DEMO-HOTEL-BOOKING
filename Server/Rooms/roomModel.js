const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
  roomName : {type:String,default:null},
  roomPrice : {type:String,default:null},
  roomType : {type:String,default:null},
  description : {type:String,default:null},
  person : {type:String,default:null},
  feature : {type:String,default:null},
  status : {type:String,default:'Active'},
  createdAt : {type:Date,default:Date.now()},
})

module.exports = new mongoose.model('rooms',roomSchema);