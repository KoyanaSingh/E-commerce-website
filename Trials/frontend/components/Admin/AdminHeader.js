"use client";

import styles from "@/styles/pages/AdminHeader.module.css";

const AdminHeader = () => {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
    };

    return (
        <header className={styles.header}>
            <div className={styles.admin}>
                <div className={styles.avatar}>
                    A
                </div>

                <div>
                    <h4>Administrator</h4>

                    <span>
                        Super Admin
                    </span>
                </div>
            </div>

            <div className={styles.right}>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;