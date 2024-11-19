const jwt = require('jsonwebtoken');

module.exports = (role) => (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, 'JWT_SECRET');
        console.log("Token verified:", decoded);
        if (role && decoded.role !== role) return res.status(403).json({ message: 'Forbidden' });
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(403).json({ message: 'Unauthorized' });
    }
};
