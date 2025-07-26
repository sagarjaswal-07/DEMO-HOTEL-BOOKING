const query = require('./queryModel');

add = (req,res) => {
  let validationError = [];

  if(!req.body.queryName){
    validationError.push('Name is required')
  }
  if(!req.body.queryEmail){
    validationError.push('Email is Required')
  }
  if(!req.body.querySubject){
    validationError.push('Subject is required')
  }
  if(!req.body.queryMessage){
    validationError.push('Message is Required')
  }
  if(validationError.length>0){
    res.json({
      status:422,
      success:false,
      message:'Validation Error Occurs',
      errors:validationError
    })
  }
        let queObj = new query();
        queObj.queryName = req.body.queryName
        queObj.queryEmail = req.body.queryEmail
        queObj.queryMessage = req.body.queryMessage
        queObj.queryPage = req.body.queryPage
        queObj.querySubject = req.body.querySubject
        queObj.save()
        .then((resSave)=>{
          res.json({
            status:200,
            success:true,
            message:'Data Added Successfully',
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

      .catch((err)=>{
        res.json({
          status:500,
          success:false,
          message:'Inetrnal Server Error',
          errors:err.message
        })
      })
  }

getall = async(req,res)=>{
  let totalCount = await query.countDocuments().exec();

  query.find()
  .then((categoryData)=>{
    res.json({
      status:200,
      success:true,
      message:"Data loaded successfully",
      data:categoryData,
      total:totalCount
    })
  })
  .catch((err)=>{
    res.json({
      status:500,
      success:false,
      message:"internal server error",
      errors:err.message
    })
  })
}

getsingle = (req,res) => {
  let validationError = [];
  if(!req.body._id){
    validationError.push('Id is Required')
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
    query.findOne({_id:req.body._id})
    .then((queryData)=>{
      if(!queryData){
        res.json({
          status:404,
          success:false,
          message:'Data Not found'
        })
      }
      else{
        res.json({
          status:200,
          success:true,
          message:'Data Loaded Succesfully',
          data:queryData
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