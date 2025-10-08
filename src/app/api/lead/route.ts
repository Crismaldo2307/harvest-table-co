import { NextResponse } from "next/server";

interface LeadPayload {
  name?: string;
  email?: string;
  eventType?: string;
  eventDate?: string;
  guests?: string;
  message?: string;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as LeadPayload;

  if (!body.name || !body.email || !body.eventType || !body.eventDate || !body.guests) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("N8N webhook URL is not configured. Set N8N_WEBHOOK_URL in environment variables.");
    return NextResponse.json({ message: "Lead captured locally. Webhook not configured." }, { status: 202 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        submittedAt: new Date().toISOString()
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Webhook request failed: ${text}`);
    }

    return NextResponse.json({ message: "Lead submitted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error forwarding lead to webhook", error);
    return NextResponse.json(
      { message: "We could not forward your request at this time. Please try again later." },
      { status: 502 }
    );
  }
}
