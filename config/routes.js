const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => res.render('statics/home'));






module.exports = router;








// const router        = require('express').Router();
//
// // Require controllers
// const statics       = require('../controllers/statics');
// const sessions      = require('../controllers/sessions');
// const registrations = require('../controllers/registrations');
// const films         = require('../controllers/films');
// const comments      = require('../controllers/comments');
//
// router.route('/')
//   .get(statics.index);
//
// router.route('/films')
//   .get(films.index)
//   .post(films.create);
//
// router.route('/films/new')
//   .get(films.new);
//
// router.route('/films/:id')
//   .get(films.show)
//   .put(films.update)
//   .delete(films.delete);
//
// router.route('/films/:id/edit')
//   .get(films.edit);
//
// router.route('/films/:id/comments')
//   .post(comments.create);
//
// router.route('/register')
//   .get(registrations.new)
//   .post(registrations.create);
//
// router.route('/login')
//   .get(sessions.new)
//   .post(sessions.create);
//
// module.exports = router;
