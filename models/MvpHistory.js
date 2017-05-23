var BaseModel = require('./BaseModel');
var Mvp = require('./Mvp');

var MvpHistory = BaseModel.Model.extend({
	tableName: 'mvp_history',
	mvp: function() {
		return this.belongsTo('Mvp');
	}
});

module.exports = BaseModel.model('MvpHistory',MvpHistory);