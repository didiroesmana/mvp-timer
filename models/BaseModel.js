var config = require('../config.json');
var knex = require('knex')(config.db);
var bookshelf = require('bookshelf')(knex);
// Pass an initialized bookshelf instance
bookshelf.plugin('pagination');
bookshelf.plugin('registry');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

module.exports = bookshelf;
