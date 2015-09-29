var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var classroomSchema = new mongoose.Schema({
  github_id: Number,
  title: String,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
  users: Array
});


module.exports = mongoose.model('Classroom', classroomSchema);