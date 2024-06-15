import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export const RootLayout = () => {
    return <>
        <Navbar />
        <div className="container mt-5">
            <Outlet />
        </div>
        <Footer />
    </>
}

