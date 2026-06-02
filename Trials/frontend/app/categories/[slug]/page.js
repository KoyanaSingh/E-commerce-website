"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductCard from "@/components/ProductCard/ProductCard";
import API from "@/services/api";
import styles from "@/styles/pages/SingleCategoryPage.module.css";

const SingleCategoryPage = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategoryProducts();
    }, []);

    const fetchCategoryProducts = async () => {
        try {
            const res = await API.get(`/api/categories/${params.slug}/products`);

            setCategory(res.data.category);
            setProducts(res.data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />

                <div className={styles.empty} >
                    Loading...
                </div>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <section className={styles.wrapper} >
                <div className={styles.banner} >
                    <h1>
                        {category?.name}
                    </h1>

                    <p>
                        Explore premium packaging products under this category.
                    </p>
                </div>

                <div className={styles.grid} >
                    {products.map(
                        (product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        )
                    )}
                </div>

                {products.length ===
                    0 && (
                        <div className={styles.empty} >
                            No Products Found
                        </div>
                    )}
            </section>

            <Footer />
        </>
    );
};

export default SingleCategoryPage;