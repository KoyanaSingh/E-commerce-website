"use client";

import { useEffect, useState, } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import InquiryForm from "@/components/InquiryForm/InquiryForm";
import API from "@/services/api";
import styles from "@/styles/pages/ProductDetails.module.css";

const ProductDetailsPage = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState("");

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await API.get(`/api/products/${params.slug}`);

            setProduct(res.data);

            setActiveImage(res.data.images?.[0]);
        } catch (error) {
            console.log(error);
        }
    };

    if (!product) {
        return (
            <div className={styles.loading}>
                Loading...
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <section className={styles.wrapper}>
                <div className={styles.left}>
                    <div className={styles.mainImage}>
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${activeImage}`}
                            alt={product.name}
                        />
                    </div>

                    <div className={styles.gallery}>
                        {product.images?.map(
                            (image, index) => (
                                <img
                                    key={index}
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}`}
                                    alt=""
                                    onClick={() => setActiveImage(image)}
                                    className={activeImage === image ? styles.active : ""}
                                />
                            )
                        )}
                    </div>
                </div>

                <div className={styles.right}>
                    <span className={styles.category} >
                        {product.category?.name}
                    </span>

                    <h1>
                        {product.name}
                    </h1>

                    <p className={styles.description} >
                        {product.description}
                    </p>

                    <div className={styles.specifications} >
                        <h3>
                            Specifications
                        </h3>

                        <p>
                            {product.specifications}
                        </p>
                    </div>

                    <button>
                        Request Quote
                    </button>
                </div>
            </section>

            <InquiryForm />

            <Footer />
        </>
    );
};

export default ProductDetailsPage;