const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;
const slugify = require('slugify')


const subSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [2, "too Short"],
        maxlength: [20, "too long"]
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    parent: {
        type: ObjectId,
        ref: "Category",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.Schema("Sub", subSchema)