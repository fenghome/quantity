const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quantitySchema = Schema({
  quantityId: { type: String },
  employee: { type: Schema.Types.ObjectId, ref: "Employee" },
  quantityType: { type: String },
  quantityName: { type: String },
  inCompanyName: { type: String },
  outCompany: { type: String }
});

module.exports = mongoose.model(quantitySchema,'Quantity');