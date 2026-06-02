const Breadcrumb = ({ currentPage }) => {
    return (
        <div style={{
            padding: "20px 0",
            fontSize: "14px",
            color: "#64748b"
        }}>
            <span style={{ color: "#0f172a" }}>Home</span>
            {" / "}
            <span>{currentPage}</span>
        </div>
    );
};