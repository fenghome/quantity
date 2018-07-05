const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quantityApplySchema = Schema({
  quantityApplyId: { type: String },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  quantityType: { type: String },
  quantityName: { type: String },
  applyNumber: { type: Number }
});

module.exports = mongoose.model('QuantityApply', quantityApplySchema);
