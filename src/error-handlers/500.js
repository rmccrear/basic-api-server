function error500(err, req, res, next) {
  console.log("Error 500", err);
  res.status(500).send("An error occured.");
}

module.exports = error500;
