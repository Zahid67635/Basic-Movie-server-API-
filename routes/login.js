const { handleJwt } = require('../controller/login');
const express = require('express');
const router = express.Router();

//login
router.post('/', handleJwt);

module.exports = router;