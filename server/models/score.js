var mongoose = require('mongoose');

var scoreSchema = new mongoose.Schema({
	bid: Number,
	name : String,
    score: Number,
	words:  Number,

});

module.exports = mongoose.model('score', scoreSchema);