const express = require('express');
const mongoose = require('mongoose');
const QuantityApply = require('../models/quantityApply');
const Company = require('../models/company');
const { getQuantityName, getQuantityApplyProp } = require('../utils/utils');
const router = express.Router();

router.get('/', function (req, res, next) {
  if (req.query.companyName) {
    Company.find({ companyName: new RegExp(req.query.companyName) }, function (err, companys) {
      if (err) return res.send({ success: false });
      const companyIds = companys.map(company => {
        return company._id;
      });
      QuantityApply.find({ company: { $in: companyIds } })
        .populate('company', 'companyName')
        .sort({ _id: -1 })
        .exec(function (err, quantityApplys) {
          if (err) return res.send({ success: false });
          return res.send({
            success: true,
            data: quantityApplys
          })
        })
    })
  } else {
    QuantityApply
      .find()
      .populate('company', 'companyName')
      .sort({ _id: -1 })
      .exec(function (err, quantityApplys) {
        if (err) return res.send({ success: false });
        return res.send({
          success: true,
          data: quantityApplys
        })
      })
  }
});

router.post('/', function (req, res, next) {
  let values = req.body;
  const companyId = values.company;
  QuantityApply.find().sort({ _id: -1 }).limit(1).exec(function (err, doc) {
    if (err) return res.send({ success: false });
    const year = (new Date()).getFullYear();
    let quantityApplyId = "";
    if (doc.length == 0) {
      quantityApplyId = 'A' + year + '0001';
    } else {
      quantityApplyId = 'A' + year + ('0000' + (parseInt(doc[0].quantityApplyId.slice(-4)) + 1)).slice(-4);
    }
    values.quantityApplyId = quantityApplyId;
    values.company = new mongoose.Types.ObjectId(values.company);
    values.quantityName = getQuantityName(values.quantityType);
    QuantityApply.create(values, function (err, quantityApply) {
      if (err) return res.send({ success: false });
      Company.findOne({ _id: companyId }, function (err, company) {
        if (err) return res.send({ success: false });
        const quantityApplyProp = getQuantityApplyProp(values.quantityType);
        company[quantityApplyProp] = parseInt(company[quantityApplyProp]) + parseInt(values.applyNumber);
        company.save();
        return res.send({
          success: true,
        })
      })
    });
  })
});

router.put('/', function (req, res, next) {
  let quantityApply = req.body;
  const companyId = quantityApply.company;
  quantityApply.company = new mongoose.Types.ObjectId(quantityApply.company);
  quantityApply.quantityName = getQuantityName(quantityApply.quantityType);
  QuantityApply.update({ _id: quantityApply._id }, quantityApply, function (err, doc) {
    if (err) return res.send({ success: false });
    Company.findOne({ _id: companyId }, function (err, company) {
      if (err) return res.send({ success: false });
      let applyProp = getQuantityApplyProp(quantityApply.quantityType);
      company[applyProp] = parseInt(quantityApply.applyNumber);
      company.save();
      return res.send({
        success: true,
        data: doc
      })
    })
  })
});

router.delete('/:id', function (req, res, next) {
  const id = req.params.id;
  QuantityApply.findOneAndRemove({ _id: id }, function (err, doc) {
    if (err) return res.send({ success: false });
    Company.findOne({ _id: doc.company }, function (err, company) {
      if (err) return res.send({ success: false });
      const applyProp = getQuantityApplyProp(doc.quantityType);
      company[applyProp] = company[applyProp] - doc.applyNumber;
      company.save();
      return res.send({ success: true, data: doc });
    })
  })
})

module.exports = router;
