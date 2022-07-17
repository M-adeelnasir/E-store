const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;
const slugify = require('slugify')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product should have a tittle"],
        maxlength: [32, "Too long"],
        text: true
    },

    slug: {
        type: String,
        required: true,
        text: true,
        toLowerCase: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [300, "Too long"],
        text: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true,
        maxlength: 32
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    subs: [{
        type: ObjectId,
        ref: 'Sub'
    }],
    quantity: Number,
    images: {
        type: Array
    },
    shipping: {
        type: String,
        enum: ["yes", "No"],
        default: "Yes"
    },
    color: {
        type: String,
        enum: ["Black", "White", "Silver", "Grey", "Blue"]
    },
    brand: {
        type: String,
        enum: ["Apple", "Samsung", "Hp", "Lenovo", "Asus"]
    },
    ratings: [{
        type: Number,
        postedBy: {
            type: ObjectId,
            ref: "User"
        }
    }]

}, { timestamps: true })

productSchema.pre('save', function (next) {
    this.title = slugify(this.title, { lower: true })
    next()
})

module.exports = mongoose.model("Product", productSchema)