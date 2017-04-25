// require modules
const express           = require('express');
const morgan            = require('morgan');
const expressEjsLayouts = require('express-ejs-layouts');
const bodyParser        = require('body-parser');
const methodOverride    = require('method-override');
const mongoose          = require('mongoose');
mongoose.Promise        = require('bluebird');
const routes            = require('./config/routes');
const User              = require('./models/user');
const session           = require('express-session');
const flash             = require('express-flash');

// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const env = require('./config/env');

// setup Express app
const app = express();
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// setup database
mongoose.connect(env.db);

// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressEjsLayouts);

app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use((req, res, next) => {
  console.log(req.session.userId);
  if (!req.session.userId) return next();

  User
    .findById(req.session.userId)
    .exec()
    .then((user) => {
      if(!user) {
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in.');
          res.redirect('/');
        });
      }

      // Re-assign the session id for good measure
      req.session.userId = user._id;

      res.locals.user = user;
      res.locals.isLoggedIn = true;

      next();
    });
});

app.use(routes);
app.listen(env.port, () => console.log(`Express is listening on port ${env.port}`));

app.use(express.static(`${__dirname}/public`));
