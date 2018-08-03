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
  let { quantityId, quantityBody } = req.body;
  let employeeIds = quantityBody.map(item => {
    return mongoose.Types.ObjectId(item.employeeId);
  })
  Employee.find({ _id: { $in: employeeIds } }, { name: 0, IDCard: 0, company: 0, quantityName: 0, quantityType: 0 }, function (err, doc) {
    let companyNames = [];
    let notInEmployees = quantityBody.map((item,index)=>{
        if(!doc.includes(item.employeeId)){
          companyNames.push(item.inCompany);
          return {
            name:item.employeeId,
            IDCard:item.IDCard,
            quantityType:item.quantityType,
            quantityName:getQuantityName(item.quantityType)
          }
        }
      });
    Company.find({companyName:{$in:companyNames}},)
  })
  // return res.send(req.body);
})

module.exports = router;
