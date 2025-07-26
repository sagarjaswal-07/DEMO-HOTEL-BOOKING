const manager = require('./managerModel')
const user = require('../User/userModel')
const bcrypt = require('bcrypt')
const roundValue = 10;

register = (req,res) => {
  let validationError = [];
  if(!req.body.name){
    validationError.push('Name is Required')
  }
  if(!req.body.email){
    validationError.push('Email is Required')
  }
  if(!req.body.password){
    validationError.push('Password is Required')
  }
  if(!req.body.contact){
    validationError.push('Contact is Required')
  }
  if(!req.body.address){
    validationError.push('Address is Required')
  }
  if(validationError.length>0){
    res.json({
      status:422,
      success:false,
      message:'Validation Error Occurs',
      errors:validationError
    })
  }
  else{
    user.findOne({email:req.body.email})
    .then((userData)=>{
      if(!userData){
        let userObj = new user();
        userObj.email = req.body.email
        userObj.password = bcrypt.hashSync(req.body.password,roundValue)
        userObj.save()
        .then((userRes)=>{
          let manObj = new manager();
          manObj.name = req.body.name
          manObj.email = req.body.email
          manObj.password = req.body.password
          manObj.contact = req.body.contact
          manObj.address = req.body.address
          manObj.userId = userRes._id
          manObj.save()
          .then((manRes)=>{
            userObj.managerId = manRes._id
            userObj.userType = manRes.userType
            userObj.save()
            .then(()=>{
              res.json({
                status:200,
                success:true,
                message:'Manager Registered Successfully',
                data:manRes
              })
            })
            .catch((err)=>{
              res.json({
                status:500,
                success:false,
                message:'Internal Server Error',
                errors:err.message
              })
            })
          })
          .catch((err)=>{
            res.json({
              status:500,
              success:false,
              message:'Internal Server Error',
              errors:err.message
            })
          })
        })
        .catch((err)=>{
          res.json({
            status:500,
            success:false,
            message:'Internal Server Error',
            errors:err.message
          })
        })
      }
      else{
        res.json({
          status:422,
          success:false,
          message:'User Already Exists',
          data:userData
        })
      }
    })
    .catch((err)=>{
      res.json({
        status:500,
        success:false,
        message:'Internal Server Error',
        errors:err.message
      })
    })
  }
}
module.exports = {
  register
}