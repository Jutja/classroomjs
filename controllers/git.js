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
  var client = github.client(_.find(req.user.tokens, {
    kind: 'github'
  }).accessToken);
  client.get('/users/pksunkara', {}, function(err, status, body, headers) {
    if (err) return next(err);
    res.render('git/classroom', {
      title: 'GitHub API',
      repo: body
    });
  });
};

/**
 * GET /classroom/new
 * Add a Classroom.
 */
exports.newClassroom = function(req, res, next) {
  var client = github.client(_.find(req.user.tokens, {
    kind: 'github'
  }).accessToken);
  var ghme = client.me();
  ghme.orgs(function(err, organ) {
    if (err) {
      res.send(err);
    } else {
      res.render('git/add_classroom', {
        organ: organ
      });
    }
    console.log(err, organ)

  })
};

/**
 * POST /classroom/new
 * Add a Classroom.
 */
exports.createClassroom = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();



  res.render('git/add_classroom');
};