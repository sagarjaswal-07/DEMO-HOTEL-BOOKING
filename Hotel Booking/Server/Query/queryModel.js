const mongoose = require('mongoose');
const querySchema =  new mongoose.Schema({
  queryName : {type:String,default:null},
  queryEmail : {type:String,default:null},
  querySubject : {type:String,default:null},
  queryPage : {type:String,default:null},
  status : {type:String,default:'Active'},
  createdAt : {type:Date,default:Date.now()},
})

module.exports = new mongoose.model('queries',querySchema);