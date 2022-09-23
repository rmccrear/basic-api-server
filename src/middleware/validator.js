const whitelistForFarmParams = ["id", "name"];

function validateParamsForFarm(params) {
  for (let key in params) {
    for (let validParam of whitelistForFarmParams) {
      if (key === validParam) return true;
    }
    return false;
  }
  return true;
}

function validator(req, res, next) {
  const params = req.body;
  if (validateParamsForFarm(params)) {
    next();
  } else {
    next("Invalid Params for Farm");
  }
}

module.exports = validator;
