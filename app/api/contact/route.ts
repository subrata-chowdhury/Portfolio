import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, email, messege } = await req.json();

    // validation
    if (name === "" || messege === "") {
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

    const res = await fetch(process.env.TELEGRAM_BOT_API_URL || '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: process.env.TELEGRAM_BOT_API_CHAT_ID,
            text: `Name: ${name}
Email: ${email}
Messege: ${messege}`
        })
    });

    if (res.status === 200) return new NextResponse('Messege Send Successfully', { status: 200 });
    return new NextResponse('Unable to send messege', { status: 500 })
}