var BaseModel = require('./BaseModel');
var MvpHistory = require('./MvpHistory');

var Mvp = BaseModel.Model.extend({
	tableName: 'mvp',
	history: function() {
		return this.hasMany(MvpHistory).query(function(qb){
			qb.limit(10);
			qb.orderBy('time','desc')}
		);
	},
	last_respawn: function() {
		return this.hasMany(MvpHistory).query(function(qb){
			qb.limit(1);
			qb.orderBy('time','desc')}
		);
	}
});

module.exports = BaseModel.model('Mvp',Mvp);