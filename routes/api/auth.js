const express = require('express');
const router = express.Router();

// @route   request-type: GET endpoint: api/auth
// @desc    Test route
// @access   Public (no need any token)
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;