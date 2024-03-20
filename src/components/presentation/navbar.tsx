import React from "react";
import Navbar from "../navbar";
import ThemeProvider from "../theme-provider";

export function NavbarPresentation() {

    return (
        <ThemeProvider>
            <Navbar />
        </ThemeProvider>
    );
}

export default NavbarPresentation;