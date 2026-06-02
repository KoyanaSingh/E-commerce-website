import styles from "@/styles/components/PageBanner.module.css";

const PageBanner = ({ title, description, }) => {
    return (
        <section className={styles.banner}>
            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <h1>{title}</h1>

                <p>{description}</p>
            </div>
        </section>
    );
};

export default PageBanner;