const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Signup
router.get('/signup', (req, res) => res.render('pages/signup'));
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hash });
        req.session.user = user;
        console.log(user);
        res.render('pages/dashboard');
    } catch (err) {
        res.send('Signup Error: ' + err.message);
    }
});

// Login
router.get('/login', (req, res) => res.render('pages/login'));
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send('No user found');
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send('Wrong password');
    req.session.user = user;
    console.log(user);
    res.render('pages/dashboard');
});


module.exports = router;
