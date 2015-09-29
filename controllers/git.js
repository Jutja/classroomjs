var secrets = require('../config/secrets');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var request = require('request');
var github = require('octonode');
var _ = require('lodash');


/**
 * GET /classroom
 * Main homepage.
 */
exports.getClassrooms = function(req, res, next) {
  var token = _.find(req.user.tokens, {
    kind: 'github'
  });
  var client = github.client(token.accessToken);
  client.get('/users/pksunkara', {}, function(err, status, body, headers) {
    if (err) return next(err);
    res.render('git/classroom', {
      title: 'GitHub API',
      repo: body
    });
    console.log(body); //json object
  });
};