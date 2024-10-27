'use client'
import { useState } from "react";
import Footer from "../components/Footer";
import Menubar from "../components/Menubar";
import "@/app/styles/Pages/InternshipsPage.css"
import Link from "next/link";

export default function InternshipsPage() {
    const [mode, setMode] = useState('light')

    return (
        <div className={'internship-page mode app ' + mode}>
            <Menubar onThemeChange={setMode} />
            <div className="empty-heading">
                <div className="heading">
                    🥲Have not get any internship yet.<br></br>
                    If anyone want to offer an internship.<br></br>
                    You can <Link href={"/#contact"}>contact me</Link>.
                </div>
            </div>
            <Footer />
        </div>
    )
}