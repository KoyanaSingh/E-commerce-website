"use client";

import { useEffect, useState, } from "react";
import AdminLayout from "@/components/Admin/AdminLayout";
import API from "@/services/api";
import styles from "@/styles/pages/AdminDashboard.module.css";

const AdminDashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await API.get("/api/dashboard/stats");

            setStats(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                Loading...
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className={styles.top} >
                <h1>
                    Dashboard
                </h1>
            </div>

            <div className={styles.statsGrid} >
                <div className={styles.card} >
                    <h3>
                        Total Products
                    </h3>

                    <h2>
                        {stats.totalProducts}
                    </h2>
                </div>

                <div className={styles.card} >
                    <h3>
                        Total Categories
                    </h3>

                    <h2>
                        {stats.totalCategories}
                    </h2>
                </div>

                <div className={styles.card} >
                    <h3>
                        Total Inquiries
                    </h3>

                    <h2>
                        {stats.totalInquiries}
                    </h2>
                </div>

                <div className={styles.card} >
                    <h3>
                        Pending Inquiries
                    </h3>

                    <h2>
                        {stats.pendingInquiries}
                    </h2>
                </div>
            </div>

            <div className={styles.section} >
                <h2>
                    Recent Inquiries
                </h2>

                <div className={styles.tableWrapper} >
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>

                                <th>
                                    Type
                                </th>

                                <th>
                                    Product
                                </th>

                                <th>
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {stats.recentInquiries.map((inquiry) => (
                                <tr key={inquiry._id} >
                                    <td>
                                        {inquiry.name}
                                    </td>

                                    <td>
                                        {inquiry.type}
                                    </td>

                                    <td>
                                        {inquiry.productId?.name || inquiry.categoryId?.name || "General"}
                                    </td>

                                    <td>
                                        {inquiry.status}
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={styles.section} >
                <h2>
                    Recent Products
                </h2>

                <div className={styles.productsGrid} >
                    {stats.recentProducts.map((product) => (
                        <div key={product._id} className={styles.productCard} >
                            <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.images?.[0]}`} alt={product.name} />

                            <h3>
                                {product.name}
                            </h3>

                            <p>
                                {product.category?.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboardPage;