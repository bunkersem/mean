const router = require('express').Router();
const path = require('path');
const axios = require('axios');

router.get('/', (req, res, next) => {
    res.send('Application API');
})

module.exports = router;