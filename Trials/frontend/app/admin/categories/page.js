"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";
import AdminLayout from "@/components/Admin/AdminLayout";
import styles from "@/styles/pages/AdminCategories.module.css";

const CategoriesPage = () => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await API.get("/api/categories");

            setCategories(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (
        id
    ) => {
        const confirmDelete = window.confirm("Delete this category?");

        if (!confirmDelete) {
            return;
        }

        try {
            await API.delete(`/api/categories/${id}`);

            setCategories((prev) =>
                prev.filter(
                    (category) =>
                        category._id !==
                        id
                )
            );
        } catch (error) {
            console.log(error);

            alert("Failed to delete category");
        }
    };

    return (
        <AdminLayout>
            <div className={styles.top}>
                <h1>
                    Categories
                </h1>

                <button onClick={() => router.push("/admin/categories/create")} >
                    Add Category
                </button>
            </div>

            {loading ? (
                <div className={styles.empty} >
                    Loading...
                </div>
            ) : categories.length === 0 ? (
                <div className={styles.empty} >
                    No categories found
                </div>
            ) : (
                <div className={styles.grid} >
                    {categories.map((category) => (
                        <div key={category._id} className={styles.card} >
                            <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${category.image}`} alt={category.name} />

                            <div className={styles.content} >
                                <h3>
                                    {category.name}
                                </h3>

                                <p>
                                    {category.description}
                                </p>

                                <div className={styles.actions} >
                                    <button onClick={() => router.push(`/admin/categories/edit/${category._id}`)} >
                                        Edit
                                    </button>

                                    <button className={styles.delete} onClick={() => deleteCategory(category._id)} >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
};

export default CategoriesPage;