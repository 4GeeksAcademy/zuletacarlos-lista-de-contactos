import React from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { Footer } from "../components/Footer.jsx";

export const Layout = () => {
    return (
        <div>
            <ScrollToTop>
                <Outlet />
                <Footer />
            </ScrollToTop>
        </div>
    );
};