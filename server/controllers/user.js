const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk');
const _ = require('lodash')


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


exports.forgotPassword = async (req, res) => {


    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
        region: process.env.AWS_REGION
    });

    const { email } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (!user || err) {
            return res.status(404).json({
                success: false,
                msg: `No user found with ${email} Email`
            })
        }

        const token = jwt.sign({ name: user.name }, process.env.JWT_PRIVATE_KEY, { expiresIn: '20m' })
        const resetLink = `${process.env.CLIENT_URL}/auth/password/reset/${token}`

        // const message = `Your password reset token is: \n\n ${resetLink} \n\n  click to reset your password`;

        user.updateOne({ resetPasswordLink: token }).exec((err, success) => {
            if (err) {
                return res.status(404).json({
                    success: false,
                    msg: "Reset passoward Failed"
                })
            }

            var params = {
                Destination: {
                    ToAddresses: [
                        user.email
                    ]
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: `<h2>Hey! ${user.name}</h2>
                            <p>Click the following link to reset your password</p>
                            <p>${resetLink}</p>
                            `
                        },
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: 'Follow the link to reset your passord'
                    }
                },
                Source: process.env.EMAIL_FROM, /* required */
                ReplyToAddresses: [
                    process.env.EMAIL_TO
                ],
            };

            const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
            sendPromise.then((data) => {
                console.log(data);
                res.json({
                    Success: true,
                    token: token,
                    msg: `Email has been sent to ${user.email}`
                })
            }).catch(err => {
                console.log(err);
                res.status(400).json({
                    success: false,
                    msg: "Email sent failed try again with a Valid email"
                })

            })


        })

    })
}


exports.resetPassword = async (req, res) => {

    try {
        const { newPassword, confirmPassword } = req.body

        if (!newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            })
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                msg: "Both fied should same password"
            })
        }

        const { resetLink } = req.params;
        if (!resetLink) {
            return res.status(400).json({
                success: false,
                data: "No link"
            })
        }

        try {
            const token = jwt.verify(resetLink, process.env.JWT_PRIVATE_KEY)

        } catch (err) {
            res.status(400).json({
                success: false,
                data: "Expired or invalid Link"
            })
        }

        let user = await User.findOne({ resetPasswordLink: resetLink })
        if (!user) {
            return res.status(400).json({
                data: "Expired or invalid Link"
            })
        }

        const updateFields = {
            password: newPassword,
            passwordResetLink: ""
        }

        user = _.extend(user, updateFields)

        user.save((err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    success: false,
                    data: "Reset password Faild, try later"
                })
            }
            res.status(200).json({
                success: true,
                data: "Password Updated Successfully"
            })
        })


    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            data: "Reset password Faild, try later"
        })

    }
}