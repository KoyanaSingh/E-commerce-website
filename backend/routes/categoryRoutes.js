const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { createCategory, getCategories, getSingleCategory, getCategoryProducts, updateCategory, deleteCategory, } = require("../controllers/categoryController");

router.post("/", authMiddleware, upload.single("image"), createCategory);
router.get("/", getCategories);
router.get("/:slug", getSingleCategory);
router.get("/:slug/products", getCategoryProducts);
router.put("/:id", authMiddleware, upload.single("image"), updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

module.exports = router;