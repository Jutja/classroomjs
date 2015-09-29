var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var assignmentSchema = new mongoose.Schema({
  github_team_id: Number,
  grouping_id: Number,
  organization_id: Number,
  public_repo: Boolean,
  title: String,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
  creator_id: Number,
  starter_code_repo_id: Number,
  users: Array,
  slug: String
});


module.exports = mongoose.model('Assignment', assignmentSchema);