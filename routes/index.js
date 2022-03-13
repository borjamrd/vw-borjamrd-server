var router = require('express').Router();

router.use('/car', require('./car'))

module.exports = router;