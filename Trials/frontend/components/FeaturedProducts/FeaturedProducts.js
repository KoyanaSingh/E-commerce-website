"use client";

import { useState } from "react";
import RFQModal from "@/components/RFQModal/RFQModal";
import styles from "@/styles/components/FeaturedProducts.module.css";

const products = [
    {
        name: "Luxury Rigid Box",
        image: "/product1.jpg",
    },
    {
        name: "Custom Duplex Box",
        image: "/product2.jpg",
    },
    {
        name: "Food Packaging Box",
        image: "/product3.jpg",
    },
];

const FeaturedProducts = () => {
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState("");

    const handleOpen = (productName) => {
        setSelectedProduct(productName);
        setOpen(true);
    };

    return (
        <>
            <section className={styles.wrapper} >
                <div className={styles.heading} >
                    <span>
                        Featured Products
                    </span>

                    <h2>
                        Premium Packaging Range
                    </h2>
                </div>

                <div className={styles.grid} >
                    {products.map((product, index) => (
                        <div className={styles.card} key={index} >
                            <img src={product.image} alt={product.name} />

                            <div className={styles.content} >
                                <h3>
                                    {product.name}
                                </h3>

                                <button onClick={() => handleOpen(product.name)} >
                                    Send Inquiry
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <RFQModal
                open={open}
                onClose={() => setOpen(false)}
                type="Product"
                productName={selectedProduct}
            />
        </>
    );
};

export default FeaturedProducts;