const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const env = require('../config/env');


mongoose.connect(env.db, () => {
  console.log('Mongoose is connected to the DB');
});

const Podcast = require('../models/podcast')


Podcast.collection.drop();

Podcast
  .create([
    {
      name: 'Front End Happy Hour',
      description: 'A place where there was a gardener call Parsely - but I don\'t think his name was Parsely.'
    },
    {
      name: 'This Week In Startups',
      description: 'The bigest Vc\'s in the valley talk investment strategy and where technology is headed'
    },
    {
      name: 'Tim Ferris',
      description: 'Tim talks with thought leaders in business, technology & health'
    }
  ])
  .then(podcasts => {
    console.log(`${podcasts.length} were created`);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  })
  .finally(() => {
    mongoose.connection.close();
  });
