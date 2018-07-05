const express = require('express');
const mongoose = require('mongoose');
const QuantityApply = require('../models/quantityApply');
const { getQuantityName } = require('../utils/utils');
const router = express.Router();

router.get('/', function (req, res, next) {
  QuantityApply
    .find()
    .populate('company', 'companyName')
    .sort({ _id: -1 })
    .exec(function (err, quantityApplys) {
      if (err) return res.send({ success: false });
      return res.send({
        success: true,
        data: data
      })
    })
});

router.post('/', function (req, res, next) {
  let values = req.body;
  QuantityApply.find().sort({ _id: -1 }).limit(1).exec(function (err, doc) {
    if (err) return res.send({ success: false });
    const year = (new Date()).getFullYear();
    const quantityApplyId = 'A' + year + ('0000' + (parseInt(doc[0].quantityApplyId.slice(-4)) + 1)).slice(-4);
    values.quantityApplyId = quantityApplyId;
    values.company = new mongoose.Types.ObjectId(values.company);
    values.quantityName = getQuantityName(values.quantityType);
    QuantityApply.create(values, function (err, quantityApply) {
      if (err) return res.send({ success: false });
      return res.send({
        success: true,
        data: quantityApply
      })
    })
  })

});



module.exports = router;
