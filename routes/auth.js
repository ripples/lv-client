var express = require('express');
var path = require("path");
var router = express.Router();

/* Authenticate a User */
router.get('/auth', function(req, res, next){
  res.send({token : "WEBTOKEN"});
});

router.get('/WEBTOKEN', function(req, res, next){
  console.log('WEBTOKEN');
  res.sendFile(path.join(__dirname+'/../views/main.html')); 

});

module.exports = router;
