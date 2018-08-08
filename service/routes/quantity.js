const express = require('express'); 

var mongoose = require('mongoose');
const router = express.Router();
const Quantity = require('../models/quantity');
const Employee = require('../models/employee');
const Company = require('../models/company');
const { getQuantityName } = require('../utils/utils');

router.get('/', function (req, res) {
  return res.send({ success: true, data: [] });
})

router.post('/', function (req, res) {
  let { quantityId, inCompanyId, inCompanyName,quantityBody } = req.body;
  
  let newEmployees = [];
  let oldEmployeeIds = [];
  let oldEmployees = [];
  let quantitys = [];
  quantityBody.forEach(item => {
    if(item.isNewEmployee){
      newEmployees.push({
        company:inCompanyId,
        name:item.employeeId,
        IDCard:item.IDCard,
        quantityType:item.quantityType,
        quantityName:getQuantityName(item.quantityType)
      });
    }else{
      oldEmployeeIds.push(item.employeeId);
      oldEmployees.push({
        company:inCompanyId,
        IDCard:item.IDCard,
        quantityType:item.quantityType,
        quantityName:getQuantityName(item.quantityType)
      })
    }
    quantitys.push({
      quantityId,
      employee:item.employeeId,
      quantityType:item.quantityType,
      quantityName:item.quantityName,
      inCompanyName,
      outCompanyName:item.outCompany
    })
  });

  Employee.insertMany(newEmployees,function(err,doc){
    if(err) return res.send({success:false});
    Employee.find({_id:{$in:oldEmployeeIds}},function(err,doc){
      if(err) return res.send({success:false});
      doc.forEach((item,index)=>{
        item.company= oldEmployees[index].company;
        item.IDCard=oldEmployees[index].IDCard;
        item.quantityType = oldEmployees[index].quantityType;
        item.quantityName = oldEmployees[index].quantityName;
        item.save();
      });
      Quantity.insertMany(quantitys,function(err,doc){
        if(err) return res.send({success:false});
        return res.send({success:true,data:doc});
      })
    })
  })

})

module.exports = router;
