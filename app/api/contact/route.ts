import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, messege } = await req.json();

    // Safe Backend Validation
    if (!name || !messege) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 },
      );
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Please enter a valid email address." },
          { status: 400 },
        );
      }
    }

    const res = await fetch(process.env.TELEGRAM_BOT_API_URL || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_BOT_API_CHAT_ID,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${messege}`,
      }),
    });

    if (res.ok) {
      return NextResponse.json(
        { success: true, message: "Message Sent Successfully" },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "Unable to send message to Telegram." },
      { status: 500 },
    );
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
