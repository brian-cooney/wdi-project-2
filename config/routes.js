const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => res.render('statics/home'));

module.exports = router;
