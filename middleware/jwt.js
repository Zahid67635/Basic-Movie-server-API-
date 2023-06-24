const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send('unauthorized access');
    }
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = user;
            next();
        });

    }
}
module.exports = { verifyJWT };