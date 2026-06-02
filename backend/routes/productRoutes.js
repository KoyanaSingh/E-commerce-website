const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct, } = require("../controllers/productController");

router.post("/", authMiddleware, upload.array("images", 10), createProduct);
router.get("/", getProducts);
router.get("/:slug", getSingleProduct);
router.put("/:slug", authMiddleware, upload.array("images", 10), updateProduct);
router.delete("/:slug", authMiddleware, deleteProduct);

module.exports = router;