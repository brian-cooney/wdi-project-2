const router        = require('express').Router();

// Require controllers
const statics       = require('../controllers/statics');
const sessions      = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const podcasts         = require('../controllers/podcasts');

router.route('/')
.get(statics.index);

router.route('/login')
.get(sessions.new)
.post(sessions.create);

router.route('/podcasts')
.get(podcasts.index)
.post(podcasts.create);

router.route('/podcasts/new')
.get(podcasts.new);

router.route('/podcasts/:id')
.get(podcasts.show)
.put(podcasts.update)
.delete(podcasts.delete);

router.route('/podcasts/:id/edit')
.get(podcasts.edit);

router.route('/register')
.get(registrations.new)
.post(registrations.create);

router.route('/login')
.get(sessions.new);

module.exports = router;
