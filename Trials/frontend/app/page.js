import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Categories from "@/components/Categories/Categories";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Footer from "@/components/Footer/Footer";

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Categories />
            <FeaturedProducts />
            <Footer />
        </>
    );
}