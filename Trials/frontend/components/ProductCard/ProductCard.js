import Link from "next/link";
import styles from "@/styles/components/ProductCard.module.css";

const ProductCard = ({ product, }) => {
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.images?.[0]}`} alt={product.name} />
            </div>

            <div className={styles.content}>
                <span>
                    {product.category?.name}
                </span>

                <h3>
                    {product.name}
                </h3>

                <p>
                    {product.description?.slice(0, 100)}
                    ...
                </p>

                <Link href={`/products/${product.slug}`} >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;