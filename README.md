# Harvest Table Co.

A modern marketing site for **Harvest Table Co.**, a premium catering company that pairs culinary excellence with smart
technology. Built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion, the project is ready for deployment on
Vercel and prepared to integrate with n8n and Google Sheets for lead management.

## ✨ Features

- Elegant single-page layout with hero, services, quote request, and contact sections.
- Floating AI Sales Agent demo with chat experience ready to connect to `/api/agent`.
- Quote form that posts to `/api/lead` and forwards submissions to an n8n webhook.
- Tailwind CSS design system using a white, gold, and olive palette.
- Framer Motion animations for smooth, premium interactions.

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

> If installing packages behind a proxy or restricted network, configure the appropriate npm registry credentials first.

### 2. Configure environment variables

Create a `.env.local` file based on the provided template:

```bash
cp .env.local.example .env.local
```

Fill in the values:

- `N8N_WEBHOOK_URL`: (Optional) The webhook URL generated in n8n that writes submissions to Google Sheets. By default the app sends submissions to `https://hook.eu2.make.com/mknqauio2hb8gnpy6qk9vo7etkqpavmz` so version 1 works out of the box.
- `OPENAI_API_KEY`: API key for the AI model that will power the virtual sales agent.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

### 4. Production build

```bash
npm run build
npm start
```

## 🔌 Connecting n8n + Google Sheets

1. In n8n, create a workflow that starts with a **Webhook** node (POST) and store the provided URL in `N8N_WEBHOOK_URL` (optional if you want to override the default Make.com webhook bundled with the project).
2. Add a **Google Sheets** node to append the payload to your desired sheet. Map the following fields:
   - `name`
   - `email`
   - `eventType`
   - `eventDate`
   - `guestCount`
   - `message`
   - `receivedAt`
3. Deploy the workflow and verify that submitting the on-site form populates new rows in Google Sheets.

## 🤖 AI Sales Agent Integration

- `/api/agent` currently returns structured demo responses and exposes the base prompt stored in `lib/agentPrompt.ts`.
- Replace the placeholder logic with calls to your preferred LLM provider (OpenAI, Azure, etc.), passing the `agentPrompt`
  as context.
- Update the client-side chat component (`components/ChatAgent.tsx`) if you need streaming responses or authentication.

## ☁️ Deploying to Vercel

1. Push this repository to GitHub.
2. Import the project into Vercel and select the `harvest-table-co` repo.
3. Set the environment variables (`N8N_WEBHOOK_URL`, `OPENAI_API_KEY`) in the Vercel dashboard.
4. Trigger a deploy—Vercel detects the Next.js project automatically and builds it with the default settings.

## 📂 Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── agent/route.ts
│   │   └── lead/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ChatAgent.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── QuoteForm.tsx
│   └── Services.tsx
├── data/demo-data.json
├── lib/agentPrompt.ts
├── public/
├── tailwind.config.ts
└── README.md
```

## 📝 Notes

- All copy on the website is written in English to support international clients.
- `demo-data.json` powers the offline experience of the AI Sales Agent.
- Update `public/` with brand imagery or logos before going live.
- Run `npm run lint` to keep the codebase aligned with Next.js linting standards.
