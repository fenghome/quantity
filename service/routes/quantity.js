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
  res.send(quantityBody);
  // let employeeIds = quantityBody.map(item => {
  //   return mongoose.Types.ObjectId(item.employeeId);
  // })
  // Employee.find(
  //   { _id: { $in: employeeIds } },
  //   { name: 0, IDCard: 0, company: 0, quantityName: 0, quantityType: 0 },
  //   function (err, doc) {
  //     if(err) return res.send({success:false});
  //     let notInEmployees = quantityBody.map((item, index) => {
  //       if (!doc.includes(item.employeeId)) {
  //         return {
  //           company: inCompanyId,
  //           name: item.employeeId,
  //           IDCard: item.IDCard,
  //           quantityType: item.quantityType,
  //           quantityName: getQuantityName(item.quantityType)
  //         }
  //       }000
  //     });
  //     Employee.insertMany(notInEmployees, function (err, doc) {
  //       if (err) return res.send({ success: false });
  //       return res.send({success:true,doc});
  //     })
  //   })
  // return res.send(req.body);
})

module.exports = router;
