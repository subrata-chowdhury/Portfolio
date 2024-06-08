import "../style/contact.css"

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyAq97yIGvx3-sTPA0KQuuNeUwTPJ_Jmj6w",
    authDomain: "contact-details-48503.firebaseapp.com",
    projectId: "contact-details-48503",
    storageBucket: "contact-details-48503.appspot.com",
    messagingSenderId: "209582268057",
    appId: "1:209582268057:web:189de925f8b7348526e208",
    measurementId: "G-14NPTG4M3D"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export default function Contact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [messege, setMessege] = useState("");

    async function addContactDetails(event) {
        event.preventDefault();

        // validation
        if (firstName === "" || lastName === "" || email === "" || phoneNumber === "" || messege === "") {
            alert("Please fill all the fields")
            return;
        }
        const phoneNumberRegex = /^\d{10}$/;
        if (!phoneNumberRegex.test(phoneNumber)) {
            alert("Please enter a valid phone number");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        const btn = event.currentTarget
        btn.disabled = true;

        // Add a new document with a generated id in firestore db
        try {
            const docRef = await addDoc(collection(db, "contact-details"), {
                name: firstName + " " + lastName,
                email: email,
                phoneNumber: phoneNumber,
                messege: messege
            });
            console.log("Document written with ID: ", docRef.id);
            alert("Messege Send Successfully");

            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setMessege("");
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error in sending messege")
        } finally {
            btn.disabled = false;
        }
    }
    return (
        <form className="screen-container">
            <div className="heading" id="contact">Contact Me</div>
            <div className="contact-container">
                <div className="left-side">
                    <img src="assets/contact-me.png" alt="" srcSet="" />
                </div>
                <div className="right-side">
                    <div className="name-inputs-container input-container">
                        <div className="sub-container">
                            <div className="input-title">First Name</div>
                            <input type="text" value={firstName} onChange={e => setFirstName(e.currentTarget.value)} name="" id="" placeholder="First Name" />
                        </div>
                        <div className="sub-container">
                            <div className="input-title">Second Name</div>
                            <input type="text" value={lastName} onChange={e => setLastName(e.currentTarget.value)} name="" id="" placeholder="Second Name" />
                        </div>
                    </div>
                    <div className="email-phone-container input-container">
                        <div className="sub-container">
                            <div className="input-title">Email</div>
                            <input type="email" value={email} onChange={e => setEmail(e.currentTarget.value)} name="" id="" placeholder="Email" />
                        </div>
                        <div className="sub-container">
                            <div className="input-title">Phone Number</div>
                            <input type="number" value={phoneNumber} onChange={e => setPhoneNumber(e.currentTarget.value)} name="" id="" placeholder="Phone Number" />
                        </div>
                    </div>
                    <div className="msg-container input-container">
                        <div className="sub-container">
                            <div className="input-title">Messege</div>
                            <input type="text" value={messege} onChange={e => setMessege(e.currentTarget.value)} name="" id="" className="msg" placeholder="Messege" />
                        </div>
                    </div>
                    <div className="send-btn-container">
                        <button className="send-btn" onClick={addContactDetails}>Send Messege</button>
                    </div>
                </div>
            </div>
        </form>
    )
}