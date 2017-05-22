var config = require('../config.json');
var knex = require('knex')(config.db);

module.exports = require('bookshelf')(knex);