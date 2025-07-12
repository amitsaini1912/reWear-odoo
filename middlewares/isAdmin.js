require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.query.token;

    if (token && token === process.env.ADMIN_TOKEN) {
        return next(); // ✅ Allow access
    } else {
        return res.status(403).render('pages/access-denied'); // or .send('Access Denied')
    }
};



