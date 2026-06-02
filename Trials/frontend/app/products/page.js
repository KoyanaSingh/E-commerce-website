"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductCard from "@/components/ProductCard/ProductCard";
import PageBanner from "@/components/PageBanner/PageBanner";
import API from "@/services/api";
import styles from "@/styles/pages/ProductsPage.module.css";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await API.get("/api/products");
            console.log("API RESPONSE:", res.data.products);
            console.log("IMAGE RESPONSE:", res.data.products[0].images);
            setProducts(res.data.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <PageBanner
                title="Our Products"
                description="Explore our premium range of industrial and customized packaging products."
            />

            <section className={styles.wrapper}>
                <div className={styles.grid}>
                    {/* {products.map((product) => ( */}
                    {Array.isArray(products) &&
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>
            </section>

            <Footer />
        </>
    );
};

export default ProductsPage;