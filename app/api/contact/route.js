import { Resend } from 'resend';

export const runtime = 'nodejs';

// ------------------ HTML Escape (prevent XSS in email body) ------------------
const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

// ------------------ Email Template ------------------
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px;">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; white-space: pre-wrap;">
        ${escapeHtml(userMessage)}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Reply to this email to respond.</p>
    </div>
  </div>
`;

// ------------------ CORS ------------------
const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://saidur.dev';

const getCorsHeaders = (requestOrigin) => {
  const isAllowed = requestOrigin === ALLOWED_ORIGIN;
  return {
    ...(isAllowed && { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN }),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
};

export async function OPTIONS(request) {
  const origin = request.headers.get('origin') || '';
  return new Response(null, { status: 204, headers: getCorsHeaders(origin) });
}

// ------------------ Rate Limiter (in-memory, per-IP) ------------------
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  rateLimitMap.set(ip, { count: entry.count + 1, start: entry.start });
  return false;
}

// ------------------ Input Limits ------------------
const MAX_NAME_LEN = 100;
const MAX_EMAIL_LEN = 254;
const MAX_MESSAGE_LEN = 2000;
const MAX_BODY_BYTES = 10 * 1024;

// ------------------ POST ------------------
export async function POST(request) {
  const origin = request.headers.get('origin') || '';
  const corsHeaders = getCorsHeaders(origin);

  try {
    // 🔒 Body size guard
    const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
    if (contentLength > MAX_BODY_BYTES) {
      return new Response(
        JSON.stringify({ success: false, message: 'Request too large.' }),
        { status: 413, headers: corsHeaders }
      );
    }

    // 🔒 Rate limiting by IP — use last XFF entry (set by trusted proxy, not spoofable)
    const xffHeader = request.headers.get('x-forwarded-for');
    const xffEntries = xffHeader ? xffHeader.split(',') : [];
    const ip =
      (xffEntries.length > 0 ? xffEntries[xffEntries.length - 1].trim() : null) ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Too many requests. Please try again later.' }),
        { status: 429, headers: corsHeaders }
      );
    }

    // 🔒 Validate required env vars
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_ADDRESS) {
      console.error('Missing required environment variables');
      return new Response(
        JSON.stringify({ success: false, message: 'Server email configuration error.' }),
        { status: 500, headers: corsHeaders }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid request body.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const { name, email, message } = body;

    // 🔎 Type + presence validation
    if (
      typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' ||
      !name.trim() || !email.trim() || !message.trim()
    ) {
      return new Response(
        JSON.stringify({ success: false, message: 'All fields are required.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 🔎 Length validation
    if (name.length > MAX_NAME_LEN || email.length > MAX_EMAIL_LEN || message.length > MAX_MESSAGE_LEN) {
      return new Response(
        JSON.stringify({ success: false, message: 'One or more fields exceed maximum allowed length.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid email address.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Strip CRLF to prevent email header injection
    const safeName = name.replace(/[\r\n]+/g, ' ').trim();
    const safeEmail = email.replace(/[\r\n;,]+/g, '').trim();

    // 📧 Send Email via Resend
    const { error } = await resend.emails.send({
      from: 'Contact Form <contact@saidur.dev>',
      to: [process.env.EMAIL_ADDRESS],
      subject: `New Message from ${safeName}`,
      html: generateEmailTemplate(safeName, safeEmail, message),
      replyTo: safeEmail,
    });

    if (error) {
      console.error('Resend Error:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Failed to send message.' }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully!' }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error.' }),
      { status: 500, headers: corsHeaders }
    );
  }
}
