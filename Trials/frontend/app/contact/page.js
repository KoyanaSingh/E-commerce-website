import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import InquiryForm from "@/components/InquiryForm/InquiryForm";
import PageBanner from "@/components/PageBanner/PageBanner";
import styles from "@/styles/pages/ContactPage.module.css";

export default function ContactPage() {
    return (
        <>
            <Navbar />

            <PageBanner title="Contact Us" description="Send your inquiry and our team will get back to you shortly." />

            <section className={styles.wrapper} >
                <div className={styles.left} >
                    <h2>
                        Get In Touch
                    </h2>

                    <p>
                        Contact our team for product inquiries, custom packaging, quotations, and bulk orders.
                    </p>

                    <div className={styles.info} >
                        <div>
                            <h4>
                                Phone
                            </h4>

                            <p>
                                +91 9876543210
                            </p>
                        </div>

                        <div>
                            <h4>
                                Email
                            </h4>

                            <p>
                                info@pkenterprises.com
                            </p>
                        </div>

                        <div>
                            <h4>
                                Address
                            </h4>

                            <p>
                                Your Company Address
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.right} >
                    <InquiryForm />
                </div>
            </section>

            <Footer />
        </>
    );
}