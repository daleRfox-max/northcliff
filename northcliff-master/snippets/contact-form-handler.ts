// snippets/contact-form-handler.ts
// Vercel serverless function for handling contact form submissions
// Place this at: /api/contact.ts (or /api/contact.js for plain JS)
//
// Required environment variables (set in Vercel dashboard):
//   RESEND_API_KEY        - your Resend API key
//   LEASING_TO_EMAIL      - jennifer@sentrypark.com
//   FROM_EMAIL            - a verified sender domain in Resend (e.g. leasing@northcliffcommons.com)

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  moveInTiming?: string;
  unitType?: string;
  message?: string;
  formType?: 'inquiry' | 'waitlist';
  website?: string; // honeypot — must be empty
}

export default async function handler(req: Request) {
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Honeypot check — bots will fill this, humans won't
  if (body.website && body.website.length > 0) {
    // Silently succeed to confuse bots
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Basic validation
  if (!body.name || !body.email) {
    return new Response(JSON.stringify({ error: 'Name and email are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!isValidEmail(body.email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const formType = body.formType || 'inquiry';
  const isWaitlist = formType === 'waitlist';

  try {
    // 1. Send notification to Jennifer
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.LEASING_TO_EMAIL!,
      subject: isWaitlist
        ? `New Waitlist Signup — ${body.name}`
        : `New Leasing Inquiry — ${body.name}`,
      html: buildInternalEmail(body),
      replyTo: body.email,
    });

    // 2. Send confirmation to the prospect
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: body.email,
      subject: "Thanks for your interest in NorthCliff Commons",
      html: buildConfirmationEmail(body, isWaitlist),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ error: 'Submission failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildInternalEmail(p: ContactPayload): string {
  return `
    <h2>${p.formType === 'waitlist' ? 'New Waitlist Signup' : 'New Leasing Inquiry'}</h2>
    <p><strong>Name:</strong> ${escape(p.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escape(p.email)}">${escape(p.email)}</a></p>
    ${p.phone ? `<p><strong>Phone:</strong> <a href="tel:${escape(p.phone)}">${escape(p.phone)}</a></p>` : ''}
    ${p.moveInTiming ? `<p><strong>Move-in timing:</strong> ${escape(p.moveInTiming)}</p>` : ''}
    ${p.unitType ? `<p><strong>Unit interest:</strong> ${escape(p.unitType)}</p>` : ''}
    ${p.message ? `<p><strong>Message:</strong><br>${escape(p.message)}</p>` : ''}
    <hr>
    <p style="font-size:12px;color:#888">Submitted via northcliffcommons.com</p>
  `;
}

function buildConfirmationEmail(p: ContactPayload, isWaitlist: boolean): string {
  return `
    <h2>Thanks for reaching out, ${escape(p.name.split(' ')[0])}.</h2>
    ${isWaitlist
      ? `<p>You're on the priority list for NorthCliff Commons. You'll receive monthly construction updates, floor plan releases, and first access to leasing as we approach our December 2027 opening.</p>`
      : `<p>Jennifer Fox has been notified of your inquiry and will be in touch soon. In the meantime, you can reach her directly:</p>
         <p><strong>Jennifer Fox</strong><br>
         <a href="tel:+13602291220">360-229-1220</a><br>
         <a href="mailto:jennifer@sentrypark.com">jennifer@sentrypark.com</a></p>`
    }
    <hr>
    <p>NorthCliff Commons<br>
    1220 Jones St., Shelton, WA 98584<br>
    <a href="https://northcliffcommons.com">northcliffcommons.com</a></p>
  `;
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
