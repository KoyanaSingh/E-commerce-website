"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/pages/AdminSidebar.module.css";

const AdminSidebar = () => {
    const pathname = usePathname();

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <div className={styles.icon}>
                    A
                </div>

                <div>
                    <h2>Admin</h2>

                    <p>
                        Admin Control Panel
                    </p>
                </div>
            </div>

            <ul className={styles.menu}>
                <li>
                    <Link href="/admin/dashboard" className={pathname === "/admin/dashboard" ? styles.active : ""} >
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link href="/admin/products" className={pathname === "/admin/products" || pathname.startsWith("/admin/products") ? styles.active : ""} >
                        Products
                    </Link>
                </li>

                <li>
                    <Link href="/admin/categories" className={pathname === "/admin/categories" || pathname.startsWith("/admin/categories") ? styles.active : ""} >
                        Categories
                    </Link>
                </li>

                <li>
                    <Link href="/admin/inquiries" className={pathname === "/admin/inquiries" ? styles.active : ""} >
                        Inquiries
                    </Link>
                </li>
            </ul>
            <div className={styles.bottom}>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;