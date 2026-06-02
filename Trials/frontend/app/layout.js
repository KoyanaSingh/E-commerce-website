import "@/styles/globals/globals.css";

export const metadata = {
    title: "PK Enterprises",
    description: "Packaging Manufacturer Website",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}