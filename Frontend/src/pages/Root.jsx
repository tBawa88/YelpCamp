import { Outlet } from "react-router-dom";

export const RootLayout = () => {
    return <>
        <h3>This Root layout</h3>
        <Outlet />
    </>
}

