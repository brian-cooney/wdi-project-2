// const Podcast = require('../models/podcast');
//
// function commentsCreate(req, res, next) {
//   Podcast
//     .findById(req.params.id)
//     .exec()
//     .then(Podcast => {
//       if (!Podcast) {
//         const err = new Error('Podcast not found');
//         err.status = 404;
//         throw err;
//       }
//
//       const comment = {
//         user: res.locals.user._id,
//         body: req.body.body
//       };
//
//       Podcast.comments.push(comment);
//
//       return Podcast.save();
//     })
//     .then((Podcast) => {
//       console.log(Podcast);
//       res.redirect(`/podcasts/${req.params.id}`);
//     })
//     .catch(next);
// }
//
// module.exports = {
//   create: commentsCreate
// };
