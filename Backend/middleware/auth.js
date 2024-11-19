const jwt = require('jsonwebtoken');

module.exports = (role) => (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Authorization header:", req.headers.authorization); // Log authorization header

    if (!token) {
        console.error("No token provided");
        return res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // Log decoded token

        if (role && decoded.role !== role) {
            console.error("Role mismatch. Expected:", role, "but got:", decoded.role);
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = { id: decoded.id, role: decoded.role };
        console.log("Authenticated user:", req.user); // Log authenticated user
        next();
    } catch (err) {
        console.error("Token verification failed:", err.message);
        return res.status(403).json({ message: 'Unauthorized' });
    }
};
