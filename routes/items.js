const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Add Item Page
router.get('/add', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('pages/add-item');
});



module.exports = router;
