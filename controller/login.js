const express = require('express');
const userCollection = require("../model/user");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

const handleJwt = async (req, res) => {
    const email = req.query.email;
    const query = { email: email };
    const user = await userCollection.findOne(query);
    if (user) {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
        res.cookie('jwt', token, { expires: new Date(Date.now() + 86400000), httpOnly: true });
        return res.send({ accessToken: token });
    }
    res.status(403).send({ accessToken: '' })
}
module.exports = { handleJwt }