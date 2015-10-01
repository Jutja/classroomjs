var secrets = require('../config/secrets');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var request = require('request');
var github = require('octonode');
var _ = require('lodash');
var Classroom = require('../models/Classroom');


/**
 * GET /classrooms
 * Main homepage.
 */
exports.getClassrooms = function(req, res, next) {
  Classroom.find({}, function(err, existingClassroom) {
    if (err) {
      req.flash('errors', {
        msg: 'There was a error with the database.'
      });
      return res.redirect('/classrooms');
    } else {
      res.render('git/classrooms', {
        classrooms: existingClassroom
      });
    }
  })
};

/**
 * GET /classroom/:title
 * Main homepage.
 */
exports.showClassroom = function(req, res, next) {
  var title = req.params.title;
  if (title) {
    Classroom.findOne({
      title: title
    }, function(err, classroom) {
      if (err) {
        req.flash('errors', {
          msg: 'There was a error with the database.'
        });
        return res.redirect('/classrooms');
      } else {
        console.log(classroom)
        res.render('git/assignments', {
          classroom: classroom
        });
      }
    })
  } else {
    res.send({status: '404, not found'})
  }
};


/**
 * GET /classroom/:title/new-assignment
 * Main homepage.
 */
exports.newAssignment = function(req, res, next) {
  var title = req.params.title;
  if (title) {
    Classroom.findOne({
      title: title
    }, function(err, classroom) {
      if (err) {
        req.flash('errors', {
          msg: 'There was a error with the database.'
        });
        return res.redirect('/classrooms');
      } else {
        console.log(classroom)
        res.render('git/new_assignments', {
          classroom: classroom
        });
      }
    })
  } else {
    res.send({status: '404, not found'})
  }
};



/**
 * GET /classrooms/new
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
 * POST /classrooms/new
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
        return res.redirect('/classrooms/new');
      } else {
        var classroom = new Classroom({
          title: organization.title,
          github_id: gid_name[0],
          created_at: date,
          updated_at: date,
          deleted_at: date,
          admins: [req.user._id],
          org_name: gid_name[1]
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