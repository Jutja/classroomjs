var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var invitationSchema = new mongoose.Schema({
  assignment_id: Number,
  key: String,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date
});


module.exports = mongoose.model('Invitation', invitationSchema);