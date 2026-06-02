"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";
import AdminLayout from "@/components/Admin/AdminLayout";
import styles from "@/styles/pages/CreateCategory.module.css";

const CreateCategoryPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [formData, setFormData] =
        useState({
            name: "",
            description: "",
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        setImage(file);

        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            alert("Category name is required");

            return;
        }

        try {
            setLoading(true);

            const data = new FormData();

            data.append("name", formData.name);

            data.append("description", formData.description);

            if (image) {
                data.append("image", image);
            }

            await API.post("/api/categories", data);

            alert("Category created successfully");

            router.push("/admin/categories");
        } catch (error) {
            console.log(error);

            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className={styles.top}>
                <h1>
                    Create Category
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
                    {loading ? "Creating..." : "Create Category"}
                </button>
            </form>
        </AdminLayout>
    );
};

export default CreateCategoryPage;