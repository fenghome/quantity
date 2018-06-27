const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = Schema({
  companyName: { type: String },
  quantityXZ: { type: Number },
  infactXZ: { type: Number },
  applyXZ: { type: Number },
  quantityZF: { type: Number },
  infactZF: { type: Number },
  applyZF: { type: Number },
  quantityGQ: { type: Number },
  infactGQ: { type: Number },
  applyGQ: { type: Number },
  quantityQE: { type: Number },
  infactQE: { type: Number },
  applyQE: { type: Number },
  quantityCE: { type: Number },
  infactCE: { type: Number },
  applyCE: { type: Number },
  quantityZS: { type: Number },
  infactZS: { type: Number },
  applyZS: { type: Number },
})

module.exports = mongoose.model('Company',CompanySchema);
