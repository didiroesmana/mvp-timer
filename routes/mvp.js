var express = require('express');
var router = express.Router();
var Mvp = require('../models/Mvp');

/* GET MVP listing. */
router.get('/', function(req, res, next) {
	Mvp.findAll([],{withRelated:['last_respawn']}).then(function(results){
	  	res.send(results.toJSON());
  	});
});

router.get('/:id?', function(req, res, next) {
	Mvp.findById(req.params.id, {withRelated:['history']}).then(function(result){
	  	res.send(result.toJSON());
  	}).catch(function(reason){
  		console.log(reason);
  		res.send({error: "not found"});
  	});
});

module.exports = router;
