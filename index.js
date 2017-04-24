// require modules
const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const routes = require('./config/routes');
const User = require('./models/user');

const { port, dbURI, secret } = require('./config/environment');

// setup Express app
const app = express();
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// setup database
mongoose.connect(dbURI);

// middleware
app.use(morgan('dev'));
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


// const express         = require('express');
// const expressLayouts  = require('express-ejs-layouts');
// const bodyParser      = require('body-parser');
// const mongoose        = require('mongoose');
// const methodOverride  = require('method-override');
// const env             = require('./config/env');
// const router          = require('./config/routes');
// const app             = express();
//
// mongoose.connect(env.db);
//
// app.set('view engine', 'ejs');
// app.set('views', `${__dirname}/views`);
//
// app.use(expressLayouts);
// app.use(express.static(`${__dirname}/public`));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride((req) => {
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     const method = req.body._method;
//     delete req.body._method;
//     return method;
//   }
// }));
//
// app.use(router);
//
// app.listen(env.port, () => console.log(`Server up and running on port: ${env.port}.`));
