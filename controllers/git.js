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
  Classroom.find({}, function(err, existingClassroom) {
    if (err) {
        req.flash('errors', {
          msg: 'There was a error with the database.'
        });
        return res.redirect('/classroom');
    } else {
      res.render('git/classroom', {
        classrooms: existingClassroom
      });
    }
  })
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
    var gid_name = organization.github_id.split(',')
    Classroom.findOne({
      title: organization.title
    }, function(err, existingClassroom) {
      if (existingClassroom) {
        req.flash('errors', {
          msg: 'Classroom with that name already exists.'
        });
        return res.redirect('/classroom/new');
      } else {
        var classroom = new Classroom({
          title: organization.title,
          github_id: gid_name[0],
          created_at: date,
          updated_at: date,
          deleted_at: date,
          admins: [req.user._id],
          org_name : gid_name[1]
        });

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