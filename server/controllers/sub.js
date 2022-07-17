const Category = require('../model/category')
const Sub = require('../model/sub')
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        const { name } = req.body
        const sub = await Sub.create({ name });
        if (!sub) {
            return res.status(404).json({
                success: false,
                msg: "sub category create fiailed! Try later"
            })
        }
        res.status(201).json({
            success: true,
            data: sub
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'SERVER ERROR'
        })
    }
}


exports.getSub = async (req, res) => {
    try {
        const slug = req.params
        const sub = await Sub.findOne(slug)
        if (!sub) {
            return res.status(404).json({
                success: false,
                msg: "No sub category found"
            })
        }

        res.json({
            success: true,
            data: sub
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'SERVER ERROR'
        })
    }
}


exports.subs = async (req, res) => {
    try {
        const subs = await Sub.find({}).sort({ createdAt: -1 })
        res.json({
            success: true,
            data: subs
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
        const sub = await Sub.findOneAndUpdate(slug, { name, slug: slugify(name) }, { new: true, runValidators: true })
        if (!sub) {
            return res.status(404).json({
                success: false,
                msg: "No category found"
            })
        }
        res.json({
            success: true,
            data: sub
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'SERVER ERROR'
        })
    }
}



exports.deleteSub = async (req, res) => {
    try {
        const { id } = req.body
        const sub = await Sub.findByIdAndDelete({ _id: id })
        if (!sub) {
            return res.status(404).json({
                success: false,
                msg: "No sub category found"
            })
        }
        res.json({
            success: true,
            msg: " Sub category deleted"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'SERVER ERROR'
        })
    }
}

exports.getSubsOnCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const subs = await Sub.find({ _id: id })
        res.status(200).json({
            success: true,
            data: subs
        })

    } catch (err) {
        console.log(sub);
        res.status(500).json({
            success: false,
            msg: "No sub category found"
        })
    }
}


