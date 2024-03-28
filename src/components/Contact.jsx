import "../style/contact.css"

export default function Contact() {
    return (
        <div className="screen-container">
            <div className="heading" id="contact">Contact Me</div>
            <div className="contact-container">
                <div className="left-side">
                    <img src="assets/contact-me.png" alt="" srcset="" />
                </div>
                <div className="right-side">
                    <div className="name-inputs-container input-container">
                        <div className="sub-container">
                            <div className="input-title">First Name</div>
                            <input type="text" name="" id="" placeholder="First Name" />
                        </div>
                        <div className="sub-container">
                            <div className="input-title">Second Name</div>
                            <input type="text" name="" id="" placeholder="Second Name" />
                        </div>
                    </div>
                    <div className="email-phone-container input-container">
                        <div className="sub-container">
                            <div className="input-title">Email</div>
                            <input type="email" name="" id="" placeholder="Email" />
                        </div>
                        <div className="sub-container">
                            <div className="input-title">Phone Number</div>
                            <input type="number" name="" id="" placeholder="Phone Number" />
                        </div>
                    </div>
                    <div className="msg-container input-container">
                        <div className="sub-container">
                            <div className="input-title">Messege</div>
                            <input type="text" name="" id="" className="msg" placeholder="Messege" />
                        </div>
                    </div>
                    <div className="send-btn-container">
                        <button className="send-btn">Send Messege</button>
                    </div>
                </div>
            </div>
        </div>
    )
}