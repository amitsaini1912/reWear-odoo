const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const User = require('../models/user');
const Item = require('../models/item');

// Admin dashboard route (renders EJS)
router.get('/', isAdmin, (req, res) => {
  res.render('pages/admin-dashboard');
});

// Manage Users
router.get('/admin/users', isAdmin, async (req, res) => {
    const users = await User.find({ isAdmin: false });
    res.render('pages/admin-users', { users });
});

// Manage Listings
router.get('/admin/listings', isAdmin, async (req, res) => {
    const items = await Item.find().populate('uploader');
    res.render('pages/admin-listings', { items });
});

// Approve Listing
router.post('/admin/listings/approve/:id', isAdmin, async (req, res) => {
    await Item.findByIdAndUpdate(req.params.id, { available: true });
    res.redirect('/admin/listings');
});

// Reject/Delete Listing
router.post('/admin/listings/delete/:id', isAdmin, async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/admin/listings');
});

// Delete User
router.post('/admin/users/delete/:id', isAdmin, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin/users');
});

module.exports = router;
