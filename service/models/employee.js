const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  name: { type: String },
  IDCard: { type: String },
  quantityType: { type: String },
  quantityName: { type: String },
});

module.exports = mongoose.model('Employee', employeeSchema);
