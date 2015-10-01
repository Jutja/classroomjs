var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var classroomSchema = new mongoose.Schema({
	github_id: Number,
	title: String,
	org_name: String,
	created_at: Date,
	updated_at: Date,
	deleted_at: Date,
	admins: Array,
	moderators: Array,
	users: Array,
	nia: {
		type: Number,
		default: 0
	}, // No of Individual Assignment
	nga: {
		type: Number,
		default: 0
	} // No of Group Assignment
});


module.exports = mongoose.model('Classroom', classroomSchema);