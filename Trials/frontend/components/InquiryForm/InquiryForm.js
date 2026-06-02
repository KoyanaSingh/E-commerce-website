"use client";

import { useState } from "react";
import API from "@/services/api";
import styles from "@/styles/components/InquiryForm.module.css";

const InquiryForm = ({ productId }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await API.post(`${process.env.NEXT_PUBLIC_API_URL}/api/inquiries`, {
                ...formData,
                productId,
            });

            alert("Inquiry Sent Successfully");

            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} >
            <h2>Send Inquiry</h2>

            <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
            />

            <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
            ></textarea>

            <button type="submit">
                {loading ? "Sending..." : "Send Inquiry"}
            </button>
        </form>
    );
};

export default InquiryForm;