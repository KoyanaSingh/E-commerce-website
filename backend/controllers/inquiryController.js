const Inquiry = require("../models/Inquiry");
const Product = require("../models/Product");
const Category = require("../models/Category");
const sendMail = require("../utils/sendMail");
const { adminInquiryTemplate, customerInquiryTemplate, } = require("../utils/emailTemplates");

exports.createInquiry = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            message,
            quantity,
            inquiryType,
            productId,
            categoryId,
        } = req.body;

        if (!name || !email || !message || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required",
            });
        }

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Phone is required",
            });
        }

        const normalizedType =
            inquiryType === "product"
                ? "Product"
                : inquiryType === "category"
                    ? "Category"
                    : "General";

        let productName = "";
        let categoryName = "";
        let derivedCategoryId = categoryId;

        if (productId) {
            const product = await Product.findById(productId).populate("category");

            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" });
            }

            productName = product.name;

            // IMPORTANT FIX
            if (product.category) {
                categoryName = product.category.name;
                derivedCategoryId = product.category._id;
            }
        }

        if (categoryId) {
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ success: false, message: "Category not found" });
            }
            categoryName = category.name;
        }

        const inquiry = await Inquiry.create({
            name,
            email,
            phone,
            message,
            quantity,
            type: normalizedType,
            productId,
            categoryId: derivedCategoryId,
            productName,
            categoryName,
        });

        const inquiryData = {
            name,
            email,
            phone,
            message,
            quantity,
            type: normalizedType,
            productName,
            categoryName,
        };

        try {
            await sendMail({
                to: process.env.ADMIN_EMAIL,
                subject: "New Inquiry Received",
                html: adminInquiryTemplate(inquiryData),
            });

            await sendMail({
                to: email,
                subject: "Inquiry Received - PK Enterprises",
                html: customerInquiryTemplate(inquiryData),
            });
        } catch (mailError) {
            console.log("Mail Error:", mailError.message);
        }

        res.status(201).json({
            success: true,
            message: "Inquiry submitted successfully",
            inquiry,
        });
    } catch (error) {
        console.error("CREATE_INQUIRY_ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find()
            .sort({ createdAt: -1 })
            .populate("productId")
            .populate("categoryId");

        res.status(200).json({ success: true, inquiries, });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, });
    }
};

exports.updateInquiryStatus = async (req, res) => {
    try {
        const allowedStatuses = ["Pending", "Contacted", "Completed",];

        if (!allowedStatuses.includes(req.body.status)) {
            return res.status(400).json({ success: false, message: "Invalid status", });
        }

        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status, },
            { new: true, }
        );

        if (!inquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found", });
        }

        res.status(200).json({ success: true, inquiry, });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, });
    }
};

exports.deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found", });
        }

        await Inquiry.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: "Inquiry deleted successfully", });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, });
    }
};