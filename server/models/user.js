const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: [6, "password Should be more then 6 chars"],
        select: false
    },
    resetPasswordLink: {
        type: String,
        default: ""
    },

    role: {
        type: String,
        default: "user",
        enum: ['admin', 'user']
    },
    cart: {
        type: Array,
        default: []
    },
    address: String,
    picture: String,
    whilist: [{
        type: ObjectId,
        ref: 'Product'
    }]

}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) { next() }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.userToken = async function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '5d' })
}


module.exports = mongoose.model('User', userSchema)