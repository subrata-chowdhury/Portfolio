'use client'
import { useState } from "react";
import Footer from "../components/Footer";
import Menubar from "../components/Menubar";
import "@/app/styles/Pages/InternshipsPage.css"
import Link from "next/link";
// import Internships from "./components/Internships";

export default function InternshipsPage() {
    const [mode, setMode] = useState('light')

    return (
        <div className={'internship-page mode app ' + mode} style={{ display: 'flex', flexDirection: 'column' }}>
            <Menubar onThemeChange={setMode} />
            <div className="empty-heading" style={{ flexGrow: 1 }}>
                <div className="heading">
                    🥲Have not get any experience yet.<br></br>
                    If anyone want to offer an internship or job.<br></br>
                    You can <Link href={"/#contact"}>contact me</Link>.
                </div>
            </div>
            {/* <Internships /> */}
            <Footer />
        </div>
    )
}