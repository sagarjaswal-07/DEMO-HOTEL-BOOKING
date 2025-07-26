const room = require('./roomModel');
add = (req,res) => {
  let validationError = [];
  if(!req.body.roomName){
    validationError.push('Room Name is Required')
  }
  if(!req.body.roomPrice){
    validationError.push('Room Price is Required')
  }
  if(!req.body.roomType){
    validationError.push('Room Type is Required')
  }
  if(!req.body.description){
    validationError.push('Description is Required')
  }
  if(!req.body.person){
    validationError.push('Person is Required')
  }
  if(!req.body.feature){
    validationError.push('Feature is Required')
  }
  if(validationError.length>0){
    res.json({
      status:422,
      success:false,
      message:'Validation Error Occurs',
      errors:validationError
    })
  }
  room.findOne({roomName:req.body.roomName})
  .then((roomData)=>{
    if(!roomData){
      let roomObj = new room();
      roomObj.roomName = req.body.roomName
      roomObj.roomPrice = req.body.roomPrice
      roomObj.roomType = req.body.roomType
      roomObj.description = req.body.description
      roomObj.person = req.body.person
      roomObj.feature = req.body.feature
      roomObj.save()
      .then((resSave)=>{
        res.json({
          status:200,
          success:true,
          message:'Data Added Succesfully',
          data:resSave
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
        message:'Data Already Exists',
        data:roomData
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

getall = async(req,res) => {
  let totalCount = await room.countDocuments().exec()
  room.find()
  .then((roomData)=>{
    res.json({
      status:200,
      success:true,
      message:'Data fetched Successfully',
      data:roomData,
      total:totalCount
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

getsingle = (req,res) => {
  let validationError = [];
  if(!req.body._id){
    validationError.push('Id is required')
  }
  if(validationError.length>0){
    res.json({
      status:422,
      success:false,
      message:'Validation error Occurs',
      errors:err.message
    })
  }
  else{
    room.findOne({_id:req.body._id})
    .then((roomData)=>{
      if(!roomData){
        res.json({
          status:404,
          success:false,
          message:'Data not Found'
        })
      }
      else{
        res.json({
          status:200,
          success:true,
          message:'Data Loaded Succesfully',
          data:roomData
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
  add,
  getall,
  getsingle
}