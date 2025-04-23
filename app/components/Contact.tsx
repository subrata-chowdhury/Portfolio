'use client'
import "@/app/styles/contact.css"
import { useState } from "react";
import { db } from "@/app/lib/firebaseInitilizer";
import { collection, addDoc } from "firebase/firestore";
import Marker from "../Icons/marker";
import MobileNotch from "../Icons/mobile-notch";
import EnvelopeIcon from "../Icons/envelope";

export default function Contact({ forwardRef = null }: { forwardRef: React.RefObject<HTMLDivElement | null> | null }) {
    return (
        <section className="screen-container">
            <h1 className="heading" id="contact" ref={forwardRef}>Contact Me</h1>
            <div className="contact-container">
                <LeftSide />
                <RightSide />
            </div>
        </section>
    )
}

function LeftSide() {
    return (
        <div className="left-side">
            <div className="contact-details-card">
                <div className="img-container">
                    <Marker />
                </div>
                <div>
                    <h2>Location</h2>
                    <div>West Bengal, India</div>
                </div>
            </div>
            <div className="contact-details-card">
                <div className="img-container">
                    <EnvelopeIcon />
                </div>
                <div>
                    <h2>Email</h2>
                    <div>subratachowdhury7000@gmail.com</div>
                </div>
            </div>
            <div className="contact-details-card">
                <div className="img-container">
                    <MobileNotch />
                </div>
                <div>
                    <h2>LinkedIn</h2>
                    <div>subrata7000</div>
                </div>
            </div>
        </div>
    )
}

const RightSide = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [messege, setMessege] = useState("");

    async function addContactDetails(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        // validation
        if (firstName === "" || lastName === "" || messege === "") {
            alert("Please fill all the fields")
            return;
        }

        if (email !== "") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address");
                return;
            }
        }

        const btn = event.currentTarget
        btn.disabled = true;

        // Add a new document with a generated id in firestore db
        try {
            const docRef = await addDoc(collection(db, "contact-details"), {
                name: firstName + " " + lastName,
                email: email,
                messege: messege
            });
            console.log("Document written with ID: ", docRef.id);
            alert("Messege Send Successfully");

            // Clear the form
            setFirstName("");
            setLastName("");
            setEmail("");
            setMessege("");
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error in sending messege")
        } finally {
            btn.disabled = false;
        }
    }
    return (
        <form className="right-side">
            <div className="name-inputs-container input-container">
                <div className="sub-container">
                    <label htmlFor="first-name" className="input-title">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        value={firstName}
                        onChange={e => setFirstName(e.currentTarget.value)}
                        placeholder="First Name"
                        aria-label="First Name"
                    />
                </div>
                <div className="sub-container">
                    <label htmlFor="last-name" className="input-title">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        value={lastName}
                        onChange={e => setLastName(e.currentTarget.value)}
                        placeholder="Last Name"
                        aria-label="Last Name"
                    />
                </div>
            </div>
            <div className="email-phone-container input-container">
                <div className="sub-container">
                    <label htmlFor="email" className="input-title">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.currentTarget.value)}
                        placeholder="Enter Email to get Reply"
                        aria-label="Email Address"
                    />
                </div>
            </div>
            <div className="msg-container input-container">
                <div className="sub-container">
                    <label htmlFor="message" className="input-title">Message</label>
                    <textarea
                        id="message"
                        value={messege}
                        onChange={e => setMessege(e.currentTarget.value)}
                        className="msg"
                        placeholder="Message"
                        rows={5}
                        aria-label="Message"
                    ></textarea>
                </div>
            </div>
            <div className="send-btn-container">
                <button
                    className="send-btn"
                    onClick={addContactDetails}
                    aria-label="Send Message"
                >
                    Send Message
                </button>
            </div>
        </form>
    )
}