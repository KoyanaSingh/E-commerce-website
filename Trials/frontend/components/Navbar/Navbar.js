"use client";

import Link from "next/link";
import { useState } from "react";
import RFQModal from "@/components/RFQModal/RFQModal";
import styles from "@/styles/components/Navbar.module.css";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className={styles.wrapper} >
                <div className={styles.topbar} >
                    <div className={styles.topLeft} >
                        <span>
                            📍 Ghaziabad, Uttar Pradesh
                        </span>
                    </div>

                    <div className={styles.topRight} >
                        <span>
                            📞 +91 9811947407
                        </span>

                        <span>
                            ✉️ pkenterprises@gmail.com
                        </span>
                    </div>
                </div>

                <nav className={styles.navbar} >
                    <Link href="/" className={styles.logo} >
                        <div className={styles.logoIcon} >
                            PK
                        </div>

                        <div>
                            <h2>
                                PK Enterprises
                            </h2>

                            <p>
                                Packaging Solutions
                            </p>
                        </div>
                    </Link>

                    <ul className={styles.menu} >
                        <li>
                            <Link href="/">
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link href="/about">
                                About
                            </Link>
                        </li>

                        <li>
                            <Link href="/products">
                                Products
                            </Link>
                        </li>

                        <li>
                            <Link href="/categories">
                                Categories
                            </Link>
                        </li>

                        <li>
                            <Link href="/contact">
                                Contact
                            </Link>
                        </li>
                    </ul>

                    <div className={styles.actions} >
                        <button className={styles.quoteBtn} onClick={() => setOpen(true)} >
                            Get Quote
                        </button>
                    </div>
                </nav>
            </header>

            <RFQModal open={open} onClose={() => setOpen(false)} type="General" />
        </>
    );
};

export default Navbar;