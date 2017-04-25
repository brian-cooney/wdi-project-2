const Podcast = require('../models/podcast');

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
  Podcast
  .create(req.body)
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
  .then((podcast) => {
    if(!podcast) return res.status(404).render('statics/404');

    for(const field in req.body) {
      podcast[field] = req.body[field];
    }

    return podcast.save();
  })
  .then((podcast) => res.redirect(`/podcasts/${podcast.id}`))
  .catch(next);
}

function podcastsDelete(req, res, next) {
  Podcast
  .findById(req.params.id)
  .then((podcast) => {
    if(!podcast) return res.status(404).render('statics/404');
    return podcast.remove();
  })
  .then(() => res.redirect('/podcasts'))
  .catch(next);
}

module.exports = {
  index: podcastsIndex,
  new: podcastsNew,
  create: podcastsCreate,
  show: podcastsShow,
  edit: podcastsEdit,
  update: podcastsUpdate,
  delete: podcastsDelete
};
