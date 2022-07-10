const expressJwt = require('express-jwt');
const User = require('../models/user')

exports.requireSignIn = expressJwt({ secret: process.env.JWT_PRIVATE_KEY, algorithms: ['sha1', 'RS256', 'HS256'] })
// req.user

exports.checkAuth = async (req, res) => {
    try {
        console.log(req.user);
        const { _id } = req.user;
        const user = await User.findById({ _id })
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User Not found"
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