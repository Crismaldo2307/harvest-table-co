import { NextRequest, NextResponse } from 'next/server';
import demoData from '@/data/demo-data.json';
import { agentPrompt } from '@/lib/agentPrompt';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { messages?: Message[] } | null;

  if (!body?.messages || !Array.isArray(body.messages)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const sanitizedHistory = body.messages.filter((message) => message.role !== 'system');
  const lastMessage = sanitizedHistory.at(-1);

  const reply = buildAssistantReply(lastMessage?.content ?? '');

  return NextResponse.json({ reply, prompt: agentPrompt });
}

function buildAssistantReply(userInput: string) {
  if (!userInput) {
    return demoData.greetings[0];
  }

  const normalized = userInput.toLowerCase();

  if (normalized.includes('quote') || normalized.includes('proposal')) {
    return demoData.quoteTemplate;
  }

  const faq = demoData.faqs.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));

  if (faq) {
    return faq.answer;
  }

  if (normalized.includes('hello') || normalized.includes('hi')) {
    return demoData.greetings[1] ?? demoData.greetings[0];
  }

  return "Thanks for reaching out! Share your event type, date, guest count, and contact details so our advisor can follow up.";
}
