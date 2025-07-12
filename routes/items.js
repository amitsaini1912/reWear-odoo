const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Add Item Page
router.get('/add', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('pages/add-item');
});

// Submit Item
router.post('/add', async (req, res) => {
    try {
        await Item.create({
            ...req.body,
            uploader: req.session.user._id
        });
        res.redirect('/dashboard');
    } catch (err) {
        res.send('Error adding item: ' + err.message);
    }
});

module.exports = router;
