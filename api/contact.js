const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 2;
const rateLimitHits = new Map();

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

module.exports = async function contactHandler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? safeJsonParse(req.body) : req.body || {};

  if (!body || typeof body !== "object") {
    return sendJson(res, 400, { error: "Invalid request body" });
  }

  if (String(body.website || "").trim()) {
    return sendJson(res, 200, { success: true });
  }

  const clientKey = getClientKey(req, body.email);
  if (isRateLimited(clientKey)) {
    return sendJson(res, 429, { error: "Please wait a moment before submitting again." });
  }

  const payload = normalizePayload(body);
  const validationError = validatePayload(payload);

  if (validationError) {
    return sendJson(res, 400, { error: validationError });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;
  const toEmail = process.env.LEASING_TO_EMAIL || "jennifer@sentrypark.com";

  if (!resendKey || !fromEmail) {
    console.error("Missing RESEND_API_KEY or FROM_EMAIL for contact form.");
    return sendJson(res, 500, { error: "Contact form is not configured yet." });
  }

  try {
    await sendEmail(resendKey, {
      from: fromEmail,
      to: [toEmail],
      subject: `New Leasing Inquiry - ${payload.name}`,
      html: buildInternalEmail(payload),
      reply_to: payload.email,
    });

    await sendEmail(resendKey, {
      from: fromEmail,
      to: [payload.email],
      subject: "Thanks for your interest in NorthCliff Commons",
      html: buildConfirmationEmail(payload),
    });

    return sendJson(res, 200, { success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return sendJson(res, 500, { error: "Submission failed. Please call Jennifer at 360-229-1220." });
  }
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, JSON_HEADERS);
  res.end(JSON.stringify(payload));
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function getClientKey(req, email) {
  const forwardedFor = String(req.headers["x-forwarded-for"] || "");
  const ip = forwardedFor.split(",")[0].trim() || req.socket?.remoteAddress || "unknown";
  return `${ip}:${String(email || "").trim().toLowerCase()}`;
}

function isRateLimited(key) {
  const now = Date.now();
  const recentHits = (rateLimitHits.get(key) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentHits.length >= RATE_LIMIT_MAX) {
    rateLimitHits.set(key, recentHits);
    return true;
  }

  recentHits.push(now);
  rateLimitHits.set(key, recentHits);
  return false;
}

function normalizePayload(body) {
  return {
    name: String(body.name || "").trim(),
    email: String(body.email || "").trim(),
    phone: String(body.phone || "").trim(),
    moveInTiming: String(body.moveInTiming || body.timing || "").trim(),
    unitType: Array.isArray(body.unitType)
      ? body.unitType.map((item) => String(item).trim()).filter(Boolean).join(", ")
      : String(body.unitType || "").trim(),
    message: String(body.message || "").trim(),
    formType: String(body.formType || "inquiry").trim(),
  };
}

function validatePayload(payload) {
  if (!payload.name) return "Name is required.";
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return "A valid email is required.";
  if (payload.formType !== "waitlist" && !payload.phone) return "Phone is required.";
  return "";
}

async function sendEmail(apiKey, message) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend request failed: ${response.status} ${detail}`);
  }
}

function buildInternalEmail(payload) {
  const isWaitlist = payload.formType === "waitlist";
  return `
    <h2>${isWaitlist ? "New Priority List Signup" : "New Leasing Inquiry"}</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
    ${payload.phone ? `<p><strong>Phone:</strong> <a href="tel:${escapeHtml(payload.phone)}">${escapeHtml(payload.phone)}</a></p>` : ""}
    ${payload.moveInTiming ? `<p><strong>Desired move-in timing:</strong> ${escapeHtml(payload.moveInTiming)}</p>` : ""}
    ${payload.unitType ? `<p><strong>Unit interest:</strong> ${escapeHtml(payload.unitType)}</p>` : ""}
    ${payload.message ? `<p><strong>Message:</strong><br>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>` : ""}
    <hr>
    <p style="font-size:12px;color:#667">Submitted from northcliff.vercel.app/leasing</p>
  `;
}

function buildConfirmationEmail(payload) {
  const firstName = payload.name.split(/\s+/)[0] || "there";
  const isWaitlist = payload.formType === "waitlist";

  return `
    <h2>Thanks for reaching out, ${escapeHtml(firstName)}.</h2>
    <p>${isWaitlist
      ? "You're on the NorthCliff Commons priority list. Jennifer will share updates as floor plans, pricing, construction progress, and leasing availability become available."
      : "Jennifer Fox has been notified of your inquiry and will be in touch as NorthCliff Commons moves toward its December 2027 opening."}</p>
    <p><strong>Jennifer Fox</strong><br>
    <a href="tel:+13602291220">360-229-1220</a><br>
    <a href="mailto:jennifer@sentrypark.com">jennifer@sentrypark.com</a></p>
    <hr>
    <p>NorthCliff Commons<br>
    1220 Jones St., Shelton, WA 98584</p>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
