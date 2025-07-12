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
router.post('/add', isAuthenticated, upload.single('image'), async (req, res) => {
  const tagsArray = req.body.tags.split(',').map(tag => tag.trim());
  
  const newItem = new Item({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    type: req.body.type,
    size: req.body.size,
    condition: req.body.condition,
    tags: tagsArray,
    image: '/uploads/' + req.file.filename,
    uploader: req.user._id, // ✅ should now be defined!
  });

  await newItem.save();
  res.redirect('/dashboard');
});

// Browse Items - uploaded by all users
router.get('/', async (req, res) => {
    const items = await Item.find().populate('uploader');
    res.render('pages/index', { items, user: req.session.user });
});

// Item Detail
router.get('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id).populate('uploader');
    res.render('pages/item-detail', { item, user: req.session.user });
});

module.exports = router;
