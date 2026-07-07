import { NextResponse } from "next/server";

const MAX_TOKEN_LEN = 4096;

export async function POST(request) {
  const secret_key = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret_key) {
    return NextResponse.json({ error: "Server configuration error.", success: false }, { status: 500 });
  }

  let reqBody;
  try {
    reqBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body.", success: false }, { status: 400 });
  }

  const { token } = reqBody;

  if (!token || typeof token !== 'string' || token.length > MAX_TOKEN_LEN) {
    return NextResponse.json({ error: "Invalid token.", success: false }, { status: 400 });
  }

  // Use URLSearchParams to safely encode and prevent parameter pollution
  const params = new URLSearchParams({ secret: secret_key, response: token });

  try {
    const res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const data = await res.json();
    if (data.success) {
      return NextResponse.json({ message: "Captcha verification success!!", success: true });
    }
    return NextResponse.json({ error: "Captcha verification failed!", success: false }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Captcha verification failed!", success: false }, { status: 500 });
  }
};