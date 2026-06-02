import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import PageBanner from "@/components/PageBanner/PageBanner";
import styles from "@/styles/pages/AboutPage.module.css";

export default function AboutPage() {
    return (
        <>
            <Navbar />

            <PageBanner title="About Us" description="Premium packaging manufacturer delivering high-quality customized packaging solutions." />

            <section className={styles.wrapper} >
                <div className={styles.content} >
                    <h2>
                        Who We Are
                    </h2>

                    <p>
                        PK Enterprises specializes in premium corrugated boxes, rigid boxes, duplex boxes, labels, stickers, and industrial packaging solutions.
                    </p>

                    <p>
                        We focus on high-quality manufacturing, customized packaging, durability, and modern packaging standards for businesses across multiple industries.
                    </p>

                    <div className={styles.stats} >
                        <div>
                            <h3>
                                10+
                            </h3>

                            <p>
                                Years Experience
                            </p>
                        </div>

                        <div>
                            <h3>
                                500+
                            </h3>

                            <p>
                                Clients
                            </p>
                        </div>

                        <div>
                            <h3>
                                1000+
                            </h3>

                            <p>
                                Projects
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}