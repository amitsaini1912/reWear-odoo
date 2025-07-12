const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const User = require('../models/user');

const upload = require('../middlewares/upload');
const isAuthenticated = require('../middlewares/isAuthenticated');

// Add Item Page
router.get('/add', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('pages/add-item');
});

// Submit Item
router.post('/add-new', async(req, res) => {
    let newItem = new Film(req.body);
        await newFilm.save();
        res.redirect("/");
});

// Browse Items - uploaded by all users
router.get('/', async (req, res) => {
    const items = await Item.find().populate('uploader');
    res.render('pages/index', { items, user: req.session.user });
});

// Item Detail
// router.get('/:id', async (req, res) => {
//     const item = await Item.findById(req.params.id).populate('uploader');
//     res.render('pages/item-detail', { item, user: req.session.user });
// });
router.get('/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id).populate('uploader');
  res.render('pages/item-detail.ejs', { item });
});

module.exports = router;
