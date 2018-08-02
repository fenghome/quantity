const express = require('express');
const router = express.Router();
const Quantity = require('../models/quantity');

router.get('/',function(req,res){
  return res.send({success:true,data:[]});
})

router.post('/',function(req,res){
  let quantity = req.body;
  let employeeIds = quantity.map(item=>{
    return item.employeeId;
  })
  Quantity.find({_id:{'$in':employeeIds}},function())
  return res.send(req.body);
})

module.exports = router;
