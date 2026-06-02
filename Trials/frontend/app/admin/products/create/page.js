"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import AdminLayout from "@/components/Admin/AdminLayout";
import styles from "@/styles/pages/CreateProduct.module.css";
import { useRouter } from "next/navigation";

const CreateProductPage = () => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] =
        useState({
            name: "",
            category: "",
            description: "",
            specifications: "",
        });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await API.get("/api/categories");

            setCategories(res.data);
        } catch (error) {
            console.log(error);
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
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.category) {
            alert("Name and category are required");

            return;
        }

        try {
            setLoading(true);

            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            images.forEach((image) => {
                data.append("images", image);
            });

            await API.post("/api/products", data);

            alert("Product created successfully");

            router.push("/admin/products");
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
                    Create Product
                </h1>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}            >
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">
                        Select Category
                    </option>

                    {categories.map((category) => (
                        <option key={category._id} value={category._id} >
                            {category.name}
                        </option>
                    )
                    )}
                </select>

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <textarea
                    name="specifications"
                    placeholder="Specifications"
                    value={formData.specifications}
                    onChange={handleChange}
                />

                <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                />

                <div className={styles.previewGrid} >
                    {images.map((image, index) => (
                        <img key={index} src={URL.createObjectURL(image)} alt="" />
                    ))}
                </div>

                <button type="submit" disabled={loading} >
                    {loading ? "Creating..." : "Create Product"}
                </button>
            </form>
        </AdminLayout>
    );
};

export default CreateProductPage;