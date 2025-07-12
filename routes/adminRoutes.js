const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const User = require('../models/user');
const Item = require('../models/item');


// Admin dashboard route (renders EJS)
// Admin dashboard
router.get('/', isAdmin, (req, res) => {
    res.render('pages/admin-dashboard');
});


module.exports = router;
