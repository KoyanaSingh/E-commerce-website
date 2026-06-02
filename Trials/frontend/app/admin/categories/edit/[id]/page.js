"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/services/api";
import AdminLayout from "@/components/Admin/AdminLayout";
import styles from "@/styles/pages/CreateCategory.module.css";

const EditCategoryPage = () => {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [formData, setFormData] =
        useState({
            name: "",
            description: "",
        });

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try {
            const res = await API.get("/api/categories");

            const category = res.data.find((item) => item._id === params.id);

            if (!category) {
                alert("Category not found");

                router.push("/admin/categories");

                return;
            }

            setFormData({
                name: category.name || "",
                description: category.description || "",
            });

            setPreview(`${process.env.NEXT_PUBLIC_API_URL}/uploads/${category.image}`);
        } catch (error) {
            console.log(error);
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file =
            e.target.files[0];

        setImage(file);

        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = new FormData();

            data.append("name", formData.name);

            data.append("description", formData.description);

            if (image) {
                data.append("image", image);
            }

            await API.put(`/api/categories/${params.id}`, data);

            alert("Category updated successfully");

            router.push("/admin/categories");
        } catch (error) {
            console.log(error);

            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <AdminLayout>
                <div>
                    Loading...
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className={styles.top}>
                <h1>
                    Edit Category
                </h1>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}            >
                <input
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="file"
                    onChange={handleImageChange}
                />

                {preview && (
                    <div className={styles.preview} >
                        <img src={preview} alt="" />
                    </div>
                )}

                <button type="submit" disabled={loading} >
                    {loading ? "Updating..." : "Update Category"}
                </button>
            </form>
        </AdminLayout>
    );
};

export default EditCategoryPage;