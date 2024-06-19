import React from "react";
import "../css/index.css"
import SideNavBar from "../components/sideNavBar/sidenavbar";


export default function SideNavLayout({ children }) {
    return (
        <div className="sidenavlayout dsp-f">
            <SideNavBar />
            <main className="sidenavlayout-children">
                {children}
            </main>
        </div>
    )
}