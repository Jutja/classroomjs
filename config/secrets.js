
module.exports = {

  db: process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test',

  sessionSecret: process.env.SESSION_SECRET || 'The Session Secret goes here',


  github: {
    clientID: process.env.GITHUB_ID || '9e2d8ea4db2326717fa1',
    clientSecret: process.env.GITHUB_SECRET || 'a25907cf198b9994d1fe85d15056457f0e1e692f',
    callbackURL: '/auth/github/callback',
    passReqToCallback: true
  },

};