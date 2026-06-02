import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminProtectedRoute from "@/components/Admin/AdminProtectedRoute";
import styles from "@/styles/pages/AdminLayout.module.css";

const AdminLayout = ({ children }) => {
    return (
        <AdminProtectedRoute>
            <div className={styles.layout}>
                <div className={styles.sidebar}>
                    <AdminSidebar />
                </div>

                <div className={styles.main}>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </div>
        </AdminProtectedRoute>
    );
};

export default AdminLayout;