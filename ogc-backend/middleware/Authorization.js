const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if(!token) {
        return res.status(401).json({
            error: 'Access Denied'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (e) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken;