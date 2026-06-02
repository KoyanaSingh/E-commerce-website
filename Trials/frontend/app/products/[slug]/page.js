"use client";

import { useEffect, useState, } from "react";
import { useParams, } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RFQModal from "@/components/RFQModal/RFQModal";
import API from "@/services/api";
import styles from "@/styles/pages/ProductDetails.module.css";

const ProductDetailsPage = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await API.get(`/api/products/${params.slug}`);

            setProduct(res.data);

            setActiveImage(res.data.images?.[0] || "");
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

                <div className={styles.loading} >
                    Loading...
                </div>

                <Footer />
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Navbar />

                <div className={styles.loading} >
                    Product not found
                </div>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <section className={styles.wrapper} >
                <div className={styles.left} >
                    <div className={styles.mainImage} >
                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${activeImage}`} alt={product.name} />
                    </div>

                    <div className={styles.gallery} >
                        {product.images?.map((image, index) => (
                            <img key={index}
                                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}`}
                                alt=""
                                onClick={() => setActiveImage(image)}
                                className={activeImage === image ? styles.active : ""}
                            />
                        )
                        )}
                    </div>
                </div>

                <div className={styles.right} >
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

                    <button
                        onClick={() =>
                            setOpen(
                                true
                            )
                        }
                    >
                        Request
                        Quote
                    </button>
                </div>
            </section>

            <RFQModal
                open={open}
                onClose={() =>
                    setOpen(false)
                }
                type="Product"
                productId={
                    product._id
                }
                productName={
                    product.name
                }
            />

            <Footer />
        </>
    );
};

export default ProductDetailsPage;