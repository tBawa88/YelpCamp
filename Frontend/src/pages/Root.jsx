import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { getTokenDuration } from "../utils/auth";
export const RootLayout = () => {
    const token = useLoaderData();
    const submit = useSubmit();
    useEffect(() => {
        if (!token)
            return;
        if (token === 'EXPIRED') { //logout user if token expired 
            submit(null, { method: 'POST', action: '/logout' });
        }

        const duration = getTokenDuration();
        const timeoutId = setTimeout(() => {
            submit(null, { method: 'POST', action: '/logout' });
        }, duration)

        return () => clearTimeout(timeoutId)

    }, [token, submit])



    return <>
        <Navbar />
        <div className="container mt-5">
            <Outlet />
        </div>
        <Footer />
    </>
}

