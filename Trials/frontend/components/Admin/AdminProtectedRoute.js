"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminProtectedRoute = ({ children, }) => {
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/admin/login");

            return;
        }

        setChecking(false);
    }, []);

    if (checking) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return children;
};

export default AdminProtectedRoute;