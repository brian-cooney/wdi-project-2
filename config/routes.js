const router        = require('express').Router();

// Require controllers
const statics       = require('../controllers/statics');
const sessions      = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const podcasts      = require('../controllers/podcasts');


function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in.');
      res.redirect('/login');
    });
  }

  return next();
}

router.route('/')
.get(statics.index);

router.route('/login')
.get(sessions.new)
.post(sessions.create);

router.route('/podcasts')
.get(podcasts.index)
.post(secureRoute, podcasts.create);


router.route('/podcasts/new')
.get(secureRoute, podcasts.new)
.get(podcasts.new);


router.route('/podcasts/:id')
.get(podcasts.show)
.put(secureRoute, podcasts.update)
.delete(secureRoute, podcasts.delete);

router.route('/podcasts/:id/edit')
.get(secureRoute, podcasts.edit);

router.route('/register')
.get(registrations.new)
.post(registrations.create);

router.route('/login')
.get(sessions.new);

router.route('/logout')
.get(sessions.delete);

module.exports = router;
