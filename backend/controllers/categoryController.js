const Category = require("../models/Category");
const Product = require("../models/Product");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

exports.createCategory = async (req, res) => {
    try {
        const { name, description, } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Category name is required", });
        }

        const slug = slugify(name, {
            lower: true,
            strict: true,
        });

        const existing =
            await Category.findOne({
                slug,
            });

        if (existing) {
            return res.status(400).json({ message: "Category already exists", });
        }

        const category =
            await Category.create({
                name,
                slug,
                description,
                image: req.file?.filename,
            });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message, });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories =
            await Category.find().sort({
                createdAt: -1,
            });

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message, });
    }
};

exports.getSingleCategory = async (req, res) => {
    try {
        const category =
            await Category.findOne({
                slug: req.params.slug,
            });

        if (!category) {
            return res.status(404).json({ message: "Category not found", });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message, });
    }
};

exports.getCategoryProducts =
    async (req, res) => {
        try {
            const category =
                await Category.findOne({
                    slug:
                        req.params.slug,
                });

            if (!category) {
                return res.status(404).json({ message: "Category not found", });
            }

            const products =
                await Product.find({
                    category:
                        category._id,
                }).populate(
                    "category"
                );

            res.status(200).json({ category, products, });
        } catch (error) {
            res.status(500).json({ message: error.message, });
        }
    };

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found", });
        }

        const updateData = {
            ...req.body,
        };

        if (req.body.name) {
            const generatedSlug = slugify(req.body.name, {
                lower: true,
                strict: true,
            });

            const existingCategory = await Category.findOne({
                slug: generatedSlug,
                _id: { $ne: req.params.id },
            });

            if (existingCategory) {
                return res.status(400).json({
                    message: "Category slug already exists",
                });
            }

            updateData.slug = generatedSlug;
        }

        if (req.file) {
            if (category.image) {
                const imagePath =
                    path.join(
                        __dirname,
                        "../uploads",
                        category.image
                    );

                if (
                    fs.existsSync(
                        imagePath
                    )
                ) {
                    fs.unlinkSync(
                        imagePath
                    );
                }
            }

            updateData.image =
                req.file.filename;
        }

        const updated =
            await Category.findByIdAndUpdate(
                req.params.id,
                updateData,
                {
                    new: true,
                }
            );

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message, });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category =
            await Category.findById(
                req.params.id
            );

        if (!category) {
            return res.status(404).json({ message: "Category not found", });
        }

        if (category.image) {
            const imagePath =
                path.join(
                    __dirname,
                    "../uploads",
                    category.image
                );

            if (
                fs.existsSync(
                    imagePath
                )
            ) {
                fs.unlinkSync(
                    imagePath
                );
            }
        }

        const products = await Product.find({ category: req.params.id, });

        if (products.length > 0) {
            return res.status(400).json({ message: "Cannot delete category with existing products", });
        }

        await Category.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({ message: "Category deleted successfully", });
    } catch (error) {
        res.status(500).json({ message: error.message, });
    }
};