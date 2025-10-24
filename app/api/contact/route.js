import axios from 'axios';
import { Resend } from 'resend';

// --- HTML Email Template ---
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

// --- Helper: Send Telegram Message ---
async function sendTelegramMessage(token, chat_id, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, { chat_id, text: message });
    return res.data.ok;
  } catch (error) {
    console.error('Telegram Error:', error.response?.data || error.message);
    return false;
  }
}

// --- Shared CORS Headers ---
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.saidur.dev', // local '*' and change to 'https://www.saidur.dev' for production
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// --- Handle Preflight ---
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// --- Handle POST Request ---
export async function POST(request) {

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, email, message: userMessage } = await request.json();

    // Validate fields
    if (!name || !email || !userMessage) {
      return new Response(
        JSON.stringify({ success: false, message: 'All fields are required.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chat_id) {
      console.warn('Missing Telegram credentials.');
    }

    const telegramMessage = `📩 New message from ${name}\n\n📧 Email: ${email}\n\n💬 Message:\n${userMessage}`;

    // --- Send Telegram Message ---
    const telegramSuccess = token && chat_id
      ? await sendTelegramMessage(token, chat_id, telegramMessage)
      : false;

    // --- Send Email via Resend ---
    let emailSuccess = false;
    try {
      await resend.emails.send({
        from: 'Portfolio <no-reply@saidur.dev>',
        to: process.env.EMAIL_ADDRESS,
        subject: `New Message from ${name}`,
        html: generateEmailTemplate(name, email, userMessage),
        reply_to: email,
      });
      emailSuccess = true;
    } catch (error) {
      console.error('Resend Email Error:', error);
    }

    if (emailSuccess || telegramSuccess) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Message sent successfully!',
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to send message via both channels.',
      }),
      { status: 500, headers: corsHeaders }
    );
  } catch (error) {
    console.error('API Error:', error.message);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error.' }),
      { status: 500, headers: corsHeaders }
    );
  }
}
