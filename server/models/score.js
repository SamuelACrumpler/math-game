var mongoose = require('mongoose');

var scoreSchema = new mongoose.Schema({
	gid: String,
	name : String,
    score: Number,
	timer:  Number,

});

module.exports = mongoose.model('score', scoreSchema);