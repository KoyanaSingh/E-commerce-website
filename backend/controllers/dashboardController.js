const Product = require("../models/Product");
const Category = require("../models/Category");
const Inquiry = require("../models/Inquiry");

exports.getDashboardStats = async (req, res) => {
    try {
        const [
            totalProducts,
            totalCategories,
            totalInquiries,
            pendingInquiries,
            recentInquiries,
            recentProducts,
        ] = await Promise.all([
            Product.countDocuments(),
            Category.countDocuments(),
            Inquiry.countDocuments(),
            Inquiry.countDocuments({ status: "Pending" }),
            Inquiry.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .populate("productId")
                .populate("categoryId"),
            Product.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .populate("category"),
        ]);

        res.status(200).json({
            totalProducts,
            totalCategories,
            totalInquiries,
            pendingInquiries,
            recentInquiries,
            recentProducts,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, });
    }
};