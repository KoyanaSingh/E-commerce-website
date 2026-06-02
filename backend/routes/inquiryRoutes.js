const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry, } = require("../controllers/inquiryController");

router.post("/", createInquiry);
router.get("/", authMiddleware, getInquiries);
router.put("/:id/status", authMiddleware, updateInquiryStatus);
router.delete("/:id", authMiddleware, deleteInquiry);

module.exports = router;