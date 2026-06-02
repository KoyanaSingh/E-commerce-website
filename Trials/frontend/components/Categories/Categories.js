import styles from "@/styles/components/Categories.module.css";

const data = [
    {
        title: "Corrugated Boxes",
        image: "/category1.jpg",
    },
    {
        title: "Rigid Boxes",
        image: "/category2.jpg",
    },
    {
        title: "Labels & Stickers",
        image: "/category3.jpg",
    },
    {
        title: "Carry Bags",
        image: "/category4.jpg",
    },
];

const Categories = () => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.heading}>
                <span>Our Categories</span>
                <h2>Packaging Solutions</h2>
            </div>

            <div className={styles.grid}>
                {data.map((item, index) => (
                    <div className={styles.card} key={index}>
                        <img src={item.image} alt={item.title} />

                        <div className={styles.overlay}>
                            <h3>{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;