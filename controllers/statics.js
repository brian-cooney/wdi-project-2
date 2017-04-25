const User = require('../models/user');

function staticsIndex(req, res) {
  // User
  //   .find()
  //   .exec()
  //   .then((users) => res.render('statics/index', { users }));
  res.render('statics/home');
}

module.exports = {
  index: staticsIndex
};
