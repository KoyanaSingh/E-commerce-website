"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";
import styles from "@/styles/pages/AdminLogin.module.css";

const AdminLoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

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
            const res = await API.post("/api/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            router.push("/admin/dashboard");
        } catch (error) {
            alert("Invalid Credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={styles.wrapper}>
            <div className={styles.overlay}></div>

            <form className={styles.form} onSubmit={handleSubmit}>
                {/* <div className={styles.logo}>
                    PK
                </div> */}

                <h1>
                    Admin Login
                </h1>

                <p>
                    Login to manage products, categories and inquiries
                </p>

                <div className={styles.field} >
                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        required />
                </div>

                <div className={styles.field} >
                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">
                    {loading ? "Please wait..." : "Login"}
                </button>
            </form>
        </section>
    );
};

export default AdminLoginPage;