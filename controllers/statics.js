function staticsIndex(req, res) {
  res.render('statics/home');
}

module.exports = {
  index: staticsIndex
};
