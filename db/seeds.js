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
  username: 'mickyginger',
  email: 'mike.hayden@ga.co',
  password: 'password',
  passwordConfirmation: 'password'
},{
  username: 'eisacke',
  email: 'emily.isacke@ga.co',
  password: 'password',
  passwordConfirmation: 'password'
}])
.then((users) => {
  console.log(`${users.length} users created!`);

  return Podcast
  .create([{
    name: 'Tim Ferris',
    description: 'Cool',
    image: 'https://www.audiosear.ch/media/6f28d4b83df3236917b30c8e0ed1388b/0/public/image_file/60757/600x600bb.jpg'
  }, {
    name: 'Tim Ferris',
    description: 'Nice',
    images: 'https://www.audiosear.ch/media/6f28d4b83df3236917b30c8e0ed1388b/0/public/image_file/60757/600x600bb.jpg'
  }]);
})
.then((podcasts) => {
  console.log(`${podcasts.length} podcasts created!`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  mongoose.connection.close();
});
