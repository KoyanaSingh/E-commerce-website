"use client";

import { useEffect, useState, } from "react";
import API from "@/services/api";
import AdminLayout from "@/components/Admin/AdminLayout";
import styles from "@/styles/pages/AdminInquiries.module.css";

const InquiriesPage = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries =
        async () => {
            try {
                const res = await API.get("/api/inquiries");

                setInquiries(res.data.inquiries);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/api/inquiries/${id}/status`, { status, });

            fetchInquiries();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteInquiry =
        async (id) => {
            const confirmDelete = window.confirm("Delete this inquiry?");

            if (!confirmDelete) {
                return;
            }

            try {
                await API.delete(`/api/inquiries/${id}`);

                fetchInquiries();
            } catch (error) {
                console.log(error);
            }
        };

    return (
        <AdminLayout>
            <div className={styles.top}>
                <h1>
                    Inquiries
                </h1>
            </div>

            {loading ? (
                <div className={styles.loading} >
                    Loading...
                </div>
            ) : (
                <div className={styles.tableWrapper}>
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
                                    Company
                                </th>

                                <th>
                                    Quantity
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {inquiries.map((inquiry) => (
                                <tr key={inquiry._id} >
                                    <td>
                                        <div className={styles.user} >
                                            <strong>
                                                {inquiry.name}
                                            </strong>

                                            <span>
                                                {inquiry.email}
                                            </span>
                                        </div>
                                    </td>

                                    <td>
                                        {inquiry.type}
                                    </td>

                                    <td>
                                        {inquiry.productId?.name || inquiry.categoryId?.name || "General"}
                                    </td>

                                    <td>
                                        {inquiry.company || "-"}
                                    </td>

                                    <td>
                                        {inquiry.quantity || "-"}
                                    </td>

                                    <td>
                                        <select value={inquiry.status}
                                            onChange={(e) => updateStatus(inquiry._id, e.target.value)} >
                                            <option>
                                                Pending
                                            </option>

                                            <option>
                                                Contacted
                                            </option>

                                            <option>
                                                Quoted
                                            </option>

                                            <option>
                                                Closed
                                            </option>
                                        </select>
                                    </td>

                                    <td>
                                        {new Date(inquiry.createdAt).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <button className={styles.delete} onClick={() => deleteInquiry(inquiry._id)} >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
};

export default InquiriesPage;