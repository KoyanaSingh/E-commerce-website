const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const app = express();
const errorMiddleware = require("./middleware/errorMiddleware");
const path = require("path");

app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173",
        /\.vercel\.app$/  // allows all vercel.app domains
    ],
    credentials: true
}));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" }, }));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, });

app.use(limiter);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/inquiries", require("./routes/inquiryRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.use(errorMiddleware);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server running",
    });
});

module.exports = app;