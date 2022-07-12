// const expressJwt = require('express-jwt');
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// exports.requireSignIn = expressJwt({ getToken: (req, res) => console.log(req.cookie), secret: process.env.JWT_PRIVATE_KEY, algorithms: ['sha1', 'RS256', 'HS256'] })
// req.user

exports.verifyJwt = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = user;
        req.token = token
        next();
    } catch (err) {
        console.log(err);
        res.status(403).json({ msg: "Token is not valid" });
    }
}

exports.checkAuth = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const user = await User.findById({ _id })
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User Not found"
            })
        }
        req.user = user


        next()
    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            msg: "JWT Authentication failed"
        })
    }
}

exports.checkAdmin = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById({ _id })
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User Not found"
            })
        }
        if (user.role !== "admin") {
            return res.status(401).json({
                success: false,
                msg: "This user has not admin previlages"
            })
        }
        req.profile = user

        next()
    } catch (err) {
        res.status(404).json({
            success: false,
            msg: "Authentication failed"
        })
    }

}