const Category = require('../model/category')
const slugify = require('slugify')
const Sub = require('../model/sub')
const Product = require('../model/product')



exports.create = async (req, res) => {
    try {
        const { name } = req.body
        const category = await Category.create({ name });
        if (!category) {
            return res.status(404).json({
                success: false,
                msg: "Category create fiailed! Try later"
            })
        }
        res.status(201).json({
            success: true,
            data: category
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'SERVER ERROR'
        })
    }
}

exports.getCategory = async (req, res) => {
    try {
        const slug = req.params
        const category = await Category.findOne(slug)
        if (!category) {
            return res.status(404).json({
                success: false,
                msg: "No category found"
            })
        }

        res.json({
            success: true,
            data: category
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'SERVER ERROR'
        })
    }
}

exports.categories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ createdAt: -1 })
        res.json({
            success: true,
            data: categories
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'SERVER ERROR'
        })
    }
}

exports.update = async (req, res) => {
    try {
        const { slug } = req.params
        const { name } = req.body
        const category = await Category.findOneAndUpdate(slug, { name, slug: slugify(name) }, { new: true, runValidators: true })
        if (!category) {
            return res.status(404).json({
                success: false,
                msg: "No category found"
            })
        }
        res.json({
            success: true,
            data: category
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'SERVER ERROR'
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.body
        const category = await Category.findByIdAndDelete({ _id: id })
        if (!category) {
            return res.status(404).json({
                success: false,
                msg: "No category found"
            })
        }
        res.json({
            success: true,
            msg: "category deleted"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'SERVER ERROR'
        })
    }
}



exports.getProducts = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await Category.findOne(slug)
        if (!category) {
            res.status(404).json({
                success: flase,
                data: {}
            })
        }

        const products = await Product.find({ category: category._id }).populate('category')
        res.status(200).json({
            success: true,
            data: category,
            products
        })
        console.log(err);
        res.status(401).json({
            success: false,
            data: {}
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'SERVER ERROR'
        })
    }
}