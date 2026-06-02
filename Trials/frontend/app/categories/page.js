"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import API from "@/services/api";
import styles from "@/styles/pages/CategoriesPage.module.css";
import PageBanner from "@/components/PageBanner/PageBanner";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await API.get("/api/categories");
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <PageBanner
                title="Categories"
                description="Explore our complete packaging product categories."
            />

            <section className={styles.wrapper}>
                <div className={styles.grid}>
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className={styles.card}
                        >
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${category.image}`}
                                alt={category.name}
                            />

                            <div className={styles.content}>
                                <h2>{category.name}</h2>

                                <p>
                                    {category.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
};

export default CategoriesPage;