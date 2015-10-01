var secrets = require('../config/secrets');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var request = require('request');
var github = require('octonode');
var _ = require('lodash');
var Classroom = require('../models/Classroom');


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
  req.assert('organization', 'Organization cannot be blank').notEmpty();
  var organization = req.body.organization;
  if (organization.title && organization.github_id) {
    var date = new Date();
    var classroom = new Classroom({
      title: req.body.title,
      github_id: req.body.github_id,
      created_at: date,
      updated_at: date,
      deleted_at: date,
      users: [req.user._id]
    });

    Classroom.findOne({
      title: req.body.title
    }, function(err, existingClassroom) {
      if (existingClassroom) {
        req.flash('errors', {
          msg: 'Classroom with that name already exists.'
        });
        return res.redirect('/classroom/new');
      } else {
        classroom.save(function(err) {
          if (err) return next(err);
          res.send(classroom)
        });
      }
    });
  } else {
    res.send({
      status: false
    });
  }

};