exports.getQuantityName = function getQuantityName(quantityType) {
  switch (quantityType) {
    case "quantityXZ":
      return "行政"
    case "quantityZF":
      return "政法"
    case "quantityGQ":
      return "工勤"
    case "quantityQE":
      return "全额拨款事业"
    case "quantityCE":
      return "差额拨款事业"
    case "quantityZS":
      return "自收自支事业"
    default:
      break;
  }
}

exports.getQuantityApplyProp = function getQuantityApplyProp(quantityType) {
  switch (quantityType) {
    case "quantityXZ":
      return "applyXZ"
    case "quantityZF":
      return "applyZF"
    case "quantityGQ":
      return "applyGQ"
    case "quantityQE":
      return "applyQE"
    case "quantityCE":
      return "applyCE"
    case "quantityZS":
      return "applyZS"
    default:
      break;
  }
}

exports.getQuantityInfactProp =  function getQuantityInfactProp(quantityType) {
  return "infact" + quantityType.slice(-2);
}

