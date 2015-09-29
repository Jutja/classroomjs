var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var AreposSchema = new mongoose.Schema({
  github_repo_id: Number,
  repo_access_id: Number,
  group_assignment_id: Number,
  created_at: Date,
  updated_at: Date
});


module.exports = mongoose.model('AssignmentRepos', AreposSchema);