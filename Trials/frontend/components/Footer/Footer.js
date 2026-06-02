import styles from "@/styles/components/Footer.module.css";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.about}>
                    <h2>PK Enterprises</h2>

                    <p>
                        Leading manufacturer of premium corrugated boxes, rigid boxes, duplex boxes, labels, stickers, and customized packaging solutions for industrial and commercial businesses.
                    </p>

                    <div className={styles.socials}>
                        <span>FB</span>
                        <span>IG</span>
                        <span>LI</span>
                    </div>
                </div>

                <div className={styles.links}>
                    <h3>Quick Links</h3>

                    <ul>
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
                </div>

                <div className={styles.contact}>
                    <h3>Contact Info</h3>

                    <div className={styles.info}>
                        <span>📍</span>
                        <p>Ghaziabad, Uttar Pradesh</p>
                    </div>

                    <div className={styles.info}>
                        <span>📞</span>
                        <p>+91 9811947407</p>
                    </div>

                    <div className={styles.info}>
                        <span>✉️</span>
                        <p>pkenterprises@gmail.com</p>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>
                    © 2026 PK Enterprises.
                    All Rights Reserved.
                </p>

                <p>
                    Designed & Developed by
                    PK Enterprises
                </p>
            </div>
        </footer>
    );
};

export default Footer;