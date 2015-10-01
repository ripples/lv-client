var express = require('express');
var path = require("path");
var router = express.Router();

/* Authenticate a User */
router.get('/api', function(req, res, next){
	var token = null;
	if (checkLogin(req))
		res.send({token : getToken(req)});
	else
		res.status(401).send('Invalid Cridentaials');
});

// dummy function t return a string "WEBTOKEN"
var getToken = function(req){
	// logic to get webtoken here
	return("WEBTOKEN");
}

var checkLogin = function(req){
	// check the login page	
	return true;
}

router.get('/WEBTOKEN', function(req, res, next){
  res.sendFile(path.join(__dirname+'/../views/main.html')); 
});

module.exports = router;
