var router = require('express').Router();

router.get('/', require('../controllers/getCarData'));

module.exports = router;