"use client";

import { useState } from "react";
import RFQModal from "@/components/RFQModal/RFQModal";
import styles from "@/styles/components/Hero.module.css";

const Hero = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <section className={styles.hero} >
                <div className={styles.overlay} ></div>

                <div className={styles.content} >
                    <span className={styles.badge} >
                        Premium Packaging Manufacturer
                    </span>

                    <h1>
                        Custom Packaging
                        <br />
                        Solutions
                    </h1>

                    <p>
                        Corrugated Boxes, Duplex Boxes, Rigid Boxes, Labels, Tags and Eco-Friendly Carry Bags.
                    </p>

                    <div className={styles.actions} >
                        <button onClick={() => setOpen(true)} >
                            Get Quote
                        </button>

                        <button className={styles.secondary} >
                            Explore Products
                        </button>
                    </div>
                </div>
            </section>

            <RFQModal open={open} onClose={() => setOpen(false)} type="General" />
        </>
    );
};

export default Hero;