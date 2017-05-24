var express = require('express');
var router = express.Router();
var MvpHistory = require('../models/MvpHistory');

/* GET History listing. */
router.get('/', function(req, res, next) {
	MvpHistory.findAll([],{withRelated:['mvp']}).then(function(results){
	  	res.send(results.toJSON());
  	});
});

router.get('/:id?', function(req, res, next) {
	MvpHistory.findById(req.params.id, {withRelated:['mvp']}).then(function(result){
	  	res.send(result.toJSON());
  	}).catch(function(reason){
  		res.send({error: "not found"});
  	});
});

router.post('/timer/:mvp_id?', function(req,res,next) {
	MvpHistory.create({mvp_id:req.params.mvp_id}).then(function(data) {
		data.load('mvp').then(function(model){
			res.send(model.toJSON());
		});
	}).catch(function(reason){
		res.send({error: "not found"});
	});
});

module.exports = router;
