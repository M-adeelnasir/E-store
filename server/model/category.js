const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;
const slugify = require('slugify')


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Too short"],
        maxlength: [32, "Too long"]
    },
    slug: {
        type: String,
        unique: true,
        index: true
    }
}, { timestamps: true })

categorySchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

module.exports = mongoose.model("Category", categorySchema)