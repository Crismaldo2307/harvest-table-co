import { NextRequest, NextResponse } from 'next/server';

const REQUIRED_FIELDS = ['name', 'email', 'eventType', 'eventDate', 'guestCount'];

export async function POST(request: NextRequest) {
  const data = (await request.json().catch(() => null)) as Record<string, string> | null;

  if (!data) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !data[field]?.toString().trim());

  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: 'Missing required fields',
        missing,
      },
      { status: 400 },
    );
  }

  const payload = {
    ...data,
    receivedAt: new Date().toISOString(),
  };

  const configuredWebhook = process.env.N8N_WEBHOOK_URL?.trim();
  const defaultWebhook = 'https://hook.eu2.make.com/mknqauio2hb8gnpy6qk9vo7etkqpavmz';
  const webhookUrl = configuredWebhook || defaultWebhook;
  const usingFallbackWebhook = !configuredWebhook;

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!webhookResponse.ok) {
      const text = await webhookResponse.text();
      throw new Error(text || 'Webhook responded with an error.');
    }

    return NextResponse.json(
      {
        success: true,
        ...(usingFallbackWebhook
          ? { message: 'Lead forwarded to default Make.com webhook. Configure N8N_WEBHOOK_URL to override.' }
          : null),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('[lead webhook] error', error);
    return NextResponse.json(
      {
        error: 'Failed to forward lead to webhook.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 502 },
    );
  }
}
