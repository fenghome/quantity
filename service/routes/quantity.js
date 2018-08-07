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
  let { quantityId, inCompanyId, quantityBody } = req.body;

  let employeeIds = quantityBody.map(item => {
    return item.employeeId;
  });
  console.log('employeeIds',employeeIds);
  Employee.find(
    { _id: { $in: employeeIds } },
    { name: 0, IDCard: 0, company: 0, quantityName: 0, quantityType: 0 },
    function (err, doc) {
      if(err) return res.send({success:false});
      console.log('doc',doc);
      // let notInEmployees = [];
      // let inEmployeeIds = [];
      // let inEmployees = [];
      // quantityBody.forEach((item, index) => {
      //   const employeeObj = {
      //     company: inCompanyId,
      //     name: item.employeeId,
      //     IDCard: item.IDCard,
      //     quantityType: item.quantityType,
      //     quantityName: getQuantityName(item.quantityType)
      //   }
      //   if (doc.includes(item.employeeId)) {
      //     inEmployeeIds.push(item.employeeId);
      //     inEmployees.push(employeeObj);
      //   }else{
      //     notInEmployees.push(employeeObj);
      //   }
      // });
      // Employee.insertMany(notInEmployees, function (err, doc) {
      //   if (err) return res.send({ success: false });
      //   Employee.updateMany({_id:{$in:inEmployeeIds}},inEmployees,function(err,doc){
      //     if(err) return res.send({success:false});
      //     return res.send({
      //       success:false,
      //       data:doc
      //     })
      //   })
      // })
    })
})

module.exports = router;
