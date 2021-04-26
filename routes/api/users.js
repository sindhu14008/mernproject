const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const config = require('config');
const { check, validationResult } = require('express-validator');

// bringing user model
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route   request-type: POST endpoint: api/users
// @desc    Register User
// @access   Public (no need any token)
router.post(
 '/',
 [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide Valid Email').isEmail(),
    check('password', 'Please enter a password with a 6 or more caharacters').isLength({min: 6})
 ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        
        try {
            // See if the user exists
            let user = await User.findOne({ email });
            if (user) {

                // user already present-So giving the client error
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }
            // Get users gravatar
            const avatar = gravatar.url(email, {
                // s- size r- rating (pg - parental guidance) d- default user avatar
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            // just creates an instance - doesn't save it, to save the user, u need to call user.save
            user = new User({
                name,
                email,
                avatar,
                password
            });
            //Encrypt password - we should create a salt before encrypt
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            
            // user will be saved to db
            await user.save();
        
            // Return jsonwebtoken - use the token to authenticate themselves in the routes
            // creating a payload
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
            
        } catch (err) {
            
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    
    
    
});

module.exports = router;
