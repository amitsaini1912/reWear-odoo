const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    points: { type: Number, default: 10 },
    
    isAdmin: { type: Boolean, default: false }  // New field for Admin panel
});

module.exports = mongoose.model('User', userSchema);
