const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(dbURI);

const User = require('../models/user');
const Podcast = require('../models/podcast');

User.collection.drop();
Podcast.collection.drop();

User
.create([{
  username: 'rgowan',
  email: 'rane@rane.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  username: 'brian',
  email: 'brian@brian.com',
  password: 'password',
  passwordConfirmation: 'password'
}])
.then(users => {
  console.log(`${users.length} were created`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  mongoose.connection.close();
});
