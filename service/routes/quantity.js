const express = require('express');

var mongoose = require('mongoose');
const router = express.Router();
const Quantity = require('../models/quantity');
const Employee = require('../models/employee');


router.get('/', function (req, res) {
  return res.send({ success: true, data: [] });
})

router.post('/', function (req, res) {
  let { quantityId, quantityBody } = req.body;
  let employeeIds = quantityBody.map(item => {
    return mongoose.Types.ObjectId(item.employeeId);
  })
  Employee.find({ _id: { $in: employeeIds } }, { name: 0, IDCard: 0, company: 0, quantityName: 0, quantityType: 0 }, function (err, doc) {
    let notInEmployees = employeeIds.map((item,index)=>{
        return !doc.includes(item)
      })
  })
  // return res.send(req.body);
})

module.exports = router;
