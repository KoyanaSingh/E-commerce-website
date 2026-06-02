"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/services/api";
import AdminLayout from "@/components/Admin/AdminLayout";
import styles from "@/styles/pages/CreateProduct.module.css";

const EditProductPage = () => {
    const params = useParams();
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] =
        useState({
            name: "",
            category: "",
            description: "",
            specifications: "",
        });

    useEffect(() => {
        fetchCategories();
        fetchProduct();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await API.get("/api/categories");

            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProduct = async () => {
        try {
            const res = await API.get(`/api/products/${params.slug}`);

            const product = res.data;

            setFormData({
                name: product.name || "",
                category: product.category?._id || "",
                description: product.description || "",
                specifications: product.specifications || "",
            });

            setExistingImages(product.images || []);
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
        setImages(
            Array.from(
                e.target.files
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data =
                new FormData();

            Object.keys(
                formData
            ).forEach((key) => {
                data.append(
                    key,
                    formData[key]
                );
            });

            images.forEach((image) => {
                data.append(
                    "images",
                    image
                );
            });

            await API.put(`/api/products/${params.slug}`, data);

            alert("Product updated successfully");

            router.push("/admin/products");
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
                    Edit Product
                </h1>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} >
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

                <div className={styles.previewGrid} >
                    {existingImages.map((image, index) => (
                        <img
                            key={index}
                            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}`}
                            alt=""
                        />
                    )
                    )}
                </div>

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
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </AdminLayout>
    );
};

export default EditProductPage;