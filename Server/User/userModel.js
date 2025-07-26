const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  email:{type:String,default:null},
  password:{type:String,default:null},
  managerId:{type:mongoose.Schema.Types.ObjectId,ref:'managers',default:null},
  userType:{type:Number,default:'3'},
  status:{type:String,default:'Unblock'},
  createdAt:{type:Date,default:Date.now()}
})
module.exports = new mongoose.model('users',userSchema)