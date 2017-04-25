const Podcast = require('../models/podcast');
// const Comment = require('../models/comment');


function podcastsIndex(req, res, next) {
  Podcast
    .find()
    .then((podcasts) => res.render('podcasts/index', { podcasts }))
    .catch(next);
}

function podcastsNew(req, res) {
  // res.render('podcasts/new', { genres });
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
    .populate('comments.user')
    .exec()
    .then(podcast => {
      /*
        Create an error to pass to the generic error handler
      */
      if (!podcast) {
        const err = new Error('Podcast not found');
        err.status = 404;
        throw err;
      }
      res.render('podcasts/show', { podcast });
    })
    .catch(next);
}

function podcastsEdit(req, res, next) {
  Podcast
    .findById(req.params.id)
    .then((podcast) => {
      if (!podcast) {
        const err = new Error('Podcast not found');
        err.status = 404;
        throw err;
      }

      res.render('podcasts/edit', { podcast });
      // res.render('podcasts/edit', { podcast, genres });
    })
    .catch(next);
}

function podcastsUpdate(req, res, next) {
  Podcast
    .findById(req.params.id)
    .then((podcast) => {
      if (!podcast) {
        const err = new Error('Podcast not found');
        err.status = 404;
        throw err;
      }

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
      if (!podcast) {
        const err = new Error('Podcast not found');
        err.status = 404;
        throw err;
      }

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
