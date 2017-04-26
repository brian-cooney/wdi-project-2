const Podcast = require('../models/podcast');
const rp      = require('request-promise');

function podcastsIndex(req, res, next) {
  Podcast
    .find()
    .then((podcasts) => res.render('podcasts/index', { podcasts }))
    .catch(next);
}

function podcastsNew(req, res) {
  res.render('podcasts/new');
}

function podcastsCreate(req, res, next) {
  const podcast = new Podcast(req.body);
  podcast.user = res.locals.user._id;

  podcast
    .save()
    .then(() => res.redirect('/podcasts'))
    .catch(next);
}

function podcastsShow(req, res, next) {
  Podcast
  .findById(req.params.id)
  .exec()
  .then(podcast => {
    if(!podcast) {
      return res.status(404).render('statics/404');
    }
    res.render('podcasts/show', { podcast });
  })
  .catch(next);
}

function podcastsEdit(req, res, next) {
  Podcast
  .findById(req.params.id)
  .exec()
  .then(podcast => {
    if(!podcast) {
      return res.status(404).render('statics/404');
    }
    res.render('podcasts/edit', { podcast});
  })
  .catch(next);
}

function podcastsUpdate(req, res, next) {
  Podcast
  .findById(req.params.id)
  .exec()
  .then(podcast => {
    if(!podcast) {
      return res.status(404).render('statics/404');
    }
    for(const field in req.body) {
      podcast[field] = req.body[field];
    }
    return podcast.save();
  })
  .then(podcast => {
    if (!podcast) {
      return res.redirect(`/podcasts/${podcast.id}`);
    }
    return res.render('podcasts/show', { podcast });
  })
  .catch(next);
}

function podcastsDelete(req, res, next) {
  Podcast
  .findById(req.params.id)
  .then(() => {
    return res.redirect('/podcasts');
  })
  .catch(next);
}

function getPodcasts(req, res) {
  rp(`https://itunes.apple.com/search?term=${req.params.query}&media=podcast&country=gb&limit=100`)
  .then(response => {
    const data = JSON.parse(response);
    res.json(data);
  });
}

module.exports = {
  index: podcastsIndex,
  new: podcastsNew,
  create: podcastsCreate,
  show: podcastsShow,
  edit: podcastsEdit,
  update: podcastsUpdate,
  delete: podcastsDelete,
  get: getPodcasts
};
