const Product = require("../models/Product");
const Category = require("../models/Category");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

exports.createProduct = async (req, res) => {
    try {
        const {
            name,
            category,
            description,
            specifications,
            featured,
        } = req.body;

        if (!name || !category) {
            return res.status(400).json({ message: "Name and category are required", });
        }

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(400).json({ message: "Invalid category", });
        }

        const slug = slugify(name, {
            lower: true,
            strict: true,
        });

        const existing = await Product.findOne({ slug, });

        if (existing) {
            return res.status(400).json({ message: "Product already exists", });
        }

        const images = req.files?.map((file) => file.filename) || [];

        const product = await Product.create({
            name,
            slug,
            category,
            description,
            specifications,
            featured,
            images,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message, });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const total = await Product.countDocuments();

        const products = await Product.find()
            .populate("category")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({ total, page, pages: Math.ceil(total / limit), products, });
    } catch (error) {
        res.status(500).json({ message: error.message, });
    }
};

exports.getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug, }).populate("category");

        if (!product) {
            return res.status(404).json({ message: "Product not found", });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message, });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug, });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updateData = { ...req.body };

        // slug update if name changes
        if (req.body.name) {
            const generatedSlug = slugify(req.body.name, {
                lower: true,
                strict: true,
            });

            const existingProduct = await Product.findOne({
                slug: generatedSlug,
                _id: { $ne: product._id },
            });

            if (existingProduct) {
                return res.status(400).json({ message: "Product slug already exists", });
            }

            updateData.slug = generatedSlug;
        }

        // validate category
        if (req.body.category) {
            const categoryExists = await Category.findById(req.body.category);

            if (!categoryExists) {
                return res.status(400).json({ message: "Invalid category", });
            }
        }

        // handle images
        let newImages = [];

        if (req.files?.length > 0) {
            newImages = req.files.map((file) => file.filename);
            updateData.images = newImages;

            // delete old images
            for (const image of product.images) {
                const imagePath = path.join(__dirname, "../uploads", image);

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        }

        const updated = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            updateData,
            { new: true }
        ).populate("category");

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug, });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // delete images
        for (const image of product.images) {
            const imagePath = path.join(__dirname, "../uploads", image);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Product.deleteOne({ slug: req.params.slug });

        res.status(200).json({ message: "Product deleted successfully", });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};