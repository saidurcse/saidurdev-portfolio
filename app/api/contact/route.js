import { Resend } from 'resend';

export const runtime = 'nodejs';

// ------------------ Email Template ------------------
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px;">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Reply to this email to respond.</p>
    </div>
  </div>
`;

// ------------------ CORS ------------------
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// ------------------ POST ------------------
export async function POST(request) {
  try {
    // 🔒 Validate required env vars
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_ADDRESS) {
      console.error('Missing required environment variables');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Server email configuration error.',
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, message } = await request.json();

    // 🔎 Basic validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'All fields are required.',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid email address.',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 📧 Send Email via Resend
    const { error } = await resend.emails.send({
      from: 'Contact Form <contact@saidur.dev>', 
      to: [process.env.EMAIL_ADDRESS],
      subject: `New Message from ${name}`,
      html: generateEmailTemplate(name, email, message),
      replyTo: email,
    });

    if (error) {
      console.error('Resend Error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Failed to send message.',
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    // ✅ Success
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message sent successfully!',
      }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error.',
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}
