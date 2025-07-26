const type = require('./roomTypeModel');

add = (req,res) => {
  let validationError = [];

  if(!req.body.roomTypeName){
    validationError.push('Room Name is Required')
  }
  if(!req.body.description){
    validationError.push('Description is Required')
  }
  if(validationError.length>0){
    res.json({
      status:422,
      success:false,
      message:'Validation Error Occurs',
      errors:validationError
    })
  }
    type.findOne({roomTypeName:req.body.roomTypeName})
    .then((roomTypeData)=>{
      if(!roomTypeData){
        let typeObj = new type();
        typeObj.roomTypeName = req.body.roomTypeName
        typeObj.description = req.body.description
        typeObj.save()
        .then((resSave)=>{
          res.json({
            status:200,
            success:true,
            message:'Data Added succesfully',
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
          data:roomTypeData
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

  getall = async(req,res)=>{
    let totalCount = await type.countDocuments().exec()
    type.find()
    .then((roomTypeData)=>{
      res.json({
        status:200,
        success:true,
        message:'Data Fetched Succesfully',
        data:roomTypeData,
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

module.exports = {
  add,
  getall
}