const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        req.payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        next();
    } catch (error) {
        res.status(403).send('Invalid token');
    }
};
