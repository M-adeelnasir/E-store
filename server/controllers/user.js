const User = require('../models/user');
const bcrypt = require('bcrypt')


exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                msg: "Password should have more then 6 chars"
            })
        }

        const userExits = await User.findOne({ email })
        if (userExits) {
            return res.status(400).json({
                success: false,
                msg: "Account already exits on this mail"
            })
        }


        const user = await User.create({ name, email, password })
        if (!user) {
            return res.status(500).json({
                success: false,
                msg: "Error in creating the user"
            })
        }

        sendToken(res, 201, user)

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "SERVER ERROR"
        })
    }
}



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                msg: "Password should have more then 6 chars"
            })
        }


        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Invalid Credentials"
            })
        }

        const isMatch = await user.comparePassword(password)
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                msg: "Invalid Credentials"
            })
        }


        sendToken(res, 200, user)


    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "SERVER ERROR"
        })
    }
}


exports.logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({
            success: true,
            msg: "Logout Succesful"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "SERVER ERROR"
        })
    }
}







const sendToken = async (res, statutsCode, user) => {

    const token = await user.userToken()

    const options = {
        expires: new Date(Date.now() + process.env.JWT_TOKEN_COOKIE_EXPIRES * 24 * 12 * 60 * 1000),
        httpOnly: true
    }

    res.status(statutsCode)
        .cookie("token", token, options)
        .json({
            success: true,
            data: { name: user.name, email: user.email, _id: user._id, token }
        })
}
