"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import AdminLayout from "@/components/Admin/AdminLayout";
import styles from "@/styles/pages/AdminProducts.module.css";
import { useRouter } from "next/navigation";

const AdminProductsPage = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await API.get("/api/products");
            setProducts(res.data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await API.delete(`/api/products/${product.slug}`);

            setProducts((prev) =>
                prev.filter(
                    (product) =>
                        product._id !== id
                )
            );
        } catch (error) {
            console.log(error);
            alert("Failed to delete product");
        }
    };

    return (
        <AdminLayout>
            <div className={styles.top}>
                <h1>Products</h1>

                <button onClick={() => router.push("/admin/products/create")} >
                    Add Product
                </button>
            </div>

            {loading ? (
                <div className={styles.empty}>
                    Loading...
                </div>
            ) : products.length === 0 ? (
                <div className={styles.empty}>
                    No products found
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* {products.map((product) => ( */}
                            {Array.isArray(products) &&
                                products.map((product) => (
                                    <tr
                                        key={product._id} >
                                        <td>
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.images?.[0]}`}
                                                alt={product.name}
                                            />
                                        </td>

                                        <td>
                                            {product.name}
                                        </td>

                                        <td>
                                            {product.category?.name}
                                        </td>

                                        <td>
                                            <button onClick={() => router.push(`/admin/products/edit/${product.slug}`)} >
                                                Edit
                                            </button>

                                            <button className={styles.delete} onClick={() => deleteProduct(product._id)} >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                                )}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminProductsPage;