require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.query.token;

    if (token === process.env.ADMIN_TOKEN) {
        console.log("✅ Token matched, admin access granted");
        return next();
    } else {
        console.log("❌ Invalid or missing admin token");
        return res.status(403).send("Access Denied: Invalid Admin Token");
    }
};


