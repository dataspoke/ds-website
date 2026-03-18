import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContactForm } from "@/lib/schemas";
import { SERVICE_OPTIONS } from "@/lib/constants";

// In-memory rate limit store — tracks submissions per IP
// Resets on server restart, which is fine for a small site
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3; // max submissions per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    // Rate limiting by IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check — if the hidden "website" field has a value, it's a bot
    if (body.website) {
      // Return success so bots think it worked, but don't send anything
      return NextResponse.json({ success: true });
    }

    const validation = validateContactForm(body);

    if (!validation.valid) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    const { name, email, company, service, message } = body;
    const serviceName =
      SERVICE_OPTIONS.find((s) => s.value === service)?.label || service;
    const contactEmail = process.env.CONTACT_EMAIL || "nick@dataspoke.com";

    if (!process.env.RESEND_API_KEY) {
      console.log("RESEND_API_KEY not set. Logging form submission:", { name, email, company, service: serviceName, message });
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send notification to Nick
    await resend.emails.send({
      from: "DataSpoke <nick@dataspoke.com>",
      to: contactEmail,
      subject: `New inquiry from ${name} — ${serviceName}`,
      text: [
        `New contact form submission:`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "Not provided"}`,
        `Service: ${serviceName}`,
        `Message: ${message || "No message provided"}`,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
