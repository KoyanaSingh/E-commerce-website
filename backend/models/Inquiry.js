const mongoose = require("mongoose");

const inquirySchema =
    new mongoose.Schema(
        {
            type: {
                type: String,
                enum: ["Product", "Category", "General",],
                default: "General",
            },

            name: {
                type: String,
                required: true,
            },

            email: {
                type: String,
                required: true,
            },

            phone: {
                type: String,
                required: true,
                default: "",
            },

            quantity: {
                type: String,
            },

            message: {
                type: String,
                required: true,
            },

            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },

            categoryId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            },

            status: {
                type: String,
                enum: ["Pending", "Contacted", "Quoted", "Closed",],
                default: "Pending",
            },

            productName: { type: String },

            categoryName: { type: String },
        },
        {
            timestamps: true,
        }
    );

inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ status: 1 });

module.exports = mongoose.model("Inquiry", inquirySchema);
