const express = require('express');
const router  = express.Router();
const statics       = require('../controllers/statics');
// const sessions      = require('../controllers/sessions');
// const registrations = require('../controllers/registrations');
// const podcasts      = require('../controllers/podcasts');
// const comments      = require('../controllers/comments');

router.route('/')
  .get(statics.index);

// router.route('/podcasts')
//   .get(podcasts.index);
  // .post(podcasts.create);

// router.route('/podcasts/new')
//   .get(podcasts.new);
//
// router.route('/podcasts/:id')
//   .get(podcasts.show)
//   .put(podcasts.update)
//   .delete(podcasts.delete);
//
// router.route('/podcasts/:id/edit')
//   .get(podcasts.edit);
//
// router.route('/podcasts/:id/comments')
//   .post(comments.create);
//
// router.route('/register')
//   .get(registrations.new)
//   .post(registrations.create);
//
// router.route('/login')
//   .get(sessions.new)
//   .post(sessions.create);

module.exports = router;
