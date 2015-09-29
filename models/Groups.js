var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
  github_team_id: Number,
  grouping_id: Number,
  title: String,
  created_at: Date,
  updated_at: Date,
  users: Array
});


module.exports = mongoose.model('Group', groupSchema);