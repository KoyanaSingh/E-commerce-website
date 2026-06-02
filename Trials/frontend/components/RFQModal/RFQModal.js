"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import styles from "@/styles/components/RFQModal.module.css";

const RFQModal = ({ open, onClose, type = "General", productId = null, categoryId = null, productName = "", categoryName = "", }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            phone: "",
            company: "",
            quantity: "",
            message: "",
        });

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await API.post("/api/inquiries", { type, ...formData, productId, categoryId, });

            alert("Inquiry submitted successfully");

            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                quantity: "",
                message: "",
            });

            onClose();
        } catch (error) {
            console.log(error);

            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!open) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.close} onClick={onClose} >
                    ×
                </button>

                <h2>
                    Request Quote
                </h2>

                {(productName ||
                    categoryName) && (
                        <p className={styles.target} >
                            {productName || categoryName}
                        </p>
                    )}

                <form onSubmit={handleSubmit} >
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

                    <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="quantity"
                        placeholder="Required Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />

                    <textarea
                        name="message"
                        rows="5"
                        placeholder="Requirement Details"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading} >
                        {loading ? "Submitting..." : "Submit Inquiry"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RFQModal;