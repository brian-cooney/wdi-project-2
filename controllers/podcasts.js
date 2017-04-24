const Podcast = require('../models/podcast');

function podcastsIndex(req, res) {
  Podcast
    .find()
    .exec()
    .then(podcasts => {
      return res.render('podcasts', { podcasts });
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}

module.exports = {
  index: podcastsIndex
};
