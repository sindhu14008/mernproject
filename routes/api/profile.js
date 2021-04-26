const express = require('express');
const router = express.Router();

// @route   request-type: GET endpoint: api/profile
// @desc    Test route
// @access   Public (no need any token)
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;