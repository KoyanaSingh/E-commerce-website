require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

const seed = async () => {
    try {
        const existingAdmin = await Admin.findOne({
            email: process.env.ADMIN_EMAIL,
        });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10
        );

        await Admin.create({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
        });

        console.log("Admin Created");

        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

seed();