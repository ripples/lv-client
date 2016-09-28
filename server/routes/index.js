var express = require("express");
var path = require("path");
var router = express.Router();

router.get("/login", function (req, res, next) {
  console.log(path.join(__dirname + "/../views/index.html"));
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

/* GET home page. */
router.get("/*", function (req, res, next) {
  console.log(path.join(__dirname + "/../views/index.html"));
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;
