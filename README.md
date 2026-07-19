# DiagramCraft AI

> Transform your ideas into beautiful diagrams using the power of AI. Type a simple prompt and let AI generate professional flowcharts, ERDs, sequence diagrams, and more in seconds.

![DiagramCraft AI](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Groq](https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge)

---

## 🌐 Live Demo

- **Frontend:** [https://diagram-craft-ai.vercel.app](https://diagram-craft-ai.vercel.app)
- **Backend:** [https://diagram-craft-ai-server.vercel.app](https://diagram-craft-ai-server.vercel.app)

### Demo Credentials
```
Email: demo@diagramcraft.ai
Password: Demo@123
```

---

## 📌 Project Overview

DiagramCraft AI is a full-stack web application where users describe what they want in plain English and the AI generates a live diagram instantly. It features a public gallery, user dashboard, AI chat assistant, and full diagram management.

### Core Flow
```
User Types Prompt → Groq AI Processes → Mermaid Code Generated → Live Diagram Rendered
```

---

## ✨ Features

### 🤖 AI Features
- **Text-to-Diagram Generator** — Type a plain English prompt, AI generates valid Mermaid.js diagram code instantly
- **AI Chat Assistant** — Conversational AI that understands your diagram, explains it, and suggests improvements with full conversation history

### Diagram Types
| Type | Description |
|------|-------------|
| Flowchart | Process flows, decision trees, user journeys |
| Sequence Diagram | API calls, system interactions |
| Entity Relationship | Database schema, data modeling |
| Class Diagram | OOP design, system architecture |
| Mind Map | Brainstorming, concept mapping |
| Gantt Chart | Project timelines, sprint planning |

### Application Features
- Public diagram gallery with search, filter, and pagination
- User authentication (Email/Password + Google OAuth)
- Personal dashboard with statistics and charts
- Create, manage, and delete diagrams
- Like and share diagrams
- Public/private diagram visibility control
- Responsive design for mobile, tablet, and desktop

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15 (App Router) | React framework with SSR |
| TypeScript | 5+ | Type safety |
| Tailwind CSS | v4 | Styling |
| TanStack Query | v5 | Server state management |
| Mermaid.js | v11 | Diagram rendering |
| Recharts | v2 | Dashboard charts |
| Framer Motion | v11 | Animations |
| React Hook Form + Zod | v7 / v3 | Form validation |
| @react-oauth/google | latest | Google OAuth |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 20 LTS | Runtime |
| Express.js | v4 | REST API framework |
| TypeScript | 5+ | Type safety |
| MongoDB Atlas | Cloud | Database |
| Mongoose | v8 | ODM |
| Groq SDK | latest | LLM API (Llama 3.3 70B) |
| JWT | latest | Authentication |
| bcryptjs | latest | Password hashing |
| google-auth-library | latest | Google OAuth verification |
| Zod | v3 | Request validation |

---

## Project Structure

```
diagramcraft/
├── diagram_craft_ai-client/          # Next.js Frontend
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (protected)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── diagrams/
│   │   │   │   ├── add/page.tsx
│   │   │   │   └── manage/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (public)/
│   │   │   ├── explore/page.tsx
│   │   │   ├── diagrams/[id]/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── blog/page.tsx
│   │   │   └── pricing/page.tsx
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── landing/
│   │   ├── diagrams/
│   │   ├── ai/
│   │   └── dashboard/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── constants/
│
└── diagram_craft_ai-server/          # Express.js Backend
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   └── utils/
    └── index.ts
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Groq API key ([console.groq.com](https://console.groq.com))
- Google OAuth credentials ([console.cloud.google.com](https://console.cloud.google.com))

---

### Backend Setup

**1. Clone and install dependencies**
```bash
cd diagram_craft_ai-server
npm install
```

**2. Create `.env` file**
```env
PORT=8000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/diagramcraft
JWT_SECRET=your_long_random_secret_key
GROQ_API_KEY=gsk_your_groq_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
```

**3. Start development server**
```bash
npm run dev
```

Server runs on `http://localhost:8000`

**4. Test health check**
```bash
curl http://localhost:8000/api/health
```

---

### Frontend Setup

**1. Install dependencies**
```bash
cd diagram_craft_ai-client
npm install
```

**2. Create `.env.local` file**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

**3. Start development server**
```bash
npm run dev
```

App runs on `http://localhost:3000`

**4. Create demo user**
```bash
curl -X POST http://localhost:8000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Demo User","email":"demo@diagramcraft.ai","password":"Demo@123"}'
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Create account | No |
| POST | `/api/auth/login` | Login | No |
| POST | `/api/auth/google` | Google OAuth | No |
| POST | `/api/auth/logout` | Logout | Yes |
| GET | `/api/auth/me` | Get current user | Yes |

### Diagrams
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/diagrams` | Get all public diagrams | No |
| GET | `/api/diagrams/:id` | Get single diagram | No |
| POST | `/api/diagrams` | Create diagram | Yes |
| PUT | `/api/diagrams/:id` | Update diagram | Yes |
| DELETE | `/api/diagrams/:id` | Delete diagram | Yes |
| GET | `/api/diagrams/user/my` | Get my diagrams | Yes |
| POST | `/api/diagrams/:id/like` | Toggle like | Yes |

### AI
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/ai/generate` | Generate diagram | Yes |
| POST | `/api/ai/regenerate` | Regenerate diagram | Yes |
| POST | `/api/ai/chat` | Chat with AI | Yes |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/health` | Health check |

---

## Database Schema

### User Model
```typescript
{
  name: String (required)
  email: String (unique, required)
  password: String (hashed, optional for OAuth)
  provider: "email" | "google"
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}
```

### Diagram Model
```typescript
{
  title: String (required)
  description: String
  mermaidCode: String (required)
  prompt: String
  diagramType: "flowchart" | "sequence" | "erd" | "class" | "mindmap" | "gantt"
  category: "business" | "tech" | "education" | "personal"
  tags: [String]
  visibility: "public" | "private"
  author: ObjectId (ref: User)
  likeCount: Number
  viewCount: Number
  createdAt: Date
  updatedAt: Date
}
```

---

## AI Integration

DiagramCraft AI uses **Groq API** with **Llama 3.3 70B** model for ultra-fast diagram generation.

### How It Works
1. User selects diagram type and writes a prompt
2. Backend builds a structured system prompt with few-shot examples
3. Groq API generates valid Mermaid.js syntax
4. Frontend renders the diagram using Mermaid.js

### Prompt Engineering
Each diagram type has a custom system prompt that includes:
- Strict output format (Mermaid syntax only)
- Few-shot examples for the specific diagram type
- No markdown fences or explanations

---

## Deployment

### Frontend — Vercel
1. Push `diagram_craft_ai-client` to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL` = your Railway/Vercel backend URL
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` = your Google Client ID

### Backend — Vercel
1. Push `diagram_craft_ai-server` to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env`

---

## Pages

| Route | Page | Access |
|-------|------|--------|
| `/` | Landing Page | Public |
| `/explore` | Explore Diagrams | Public |
| `/diagrams/[id]` | Diagram Details | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/dashboard` | Dashboard | Private |
| `/diagrams/add` | Create Diagram | Private |
| `/diagrams/manage` | Manage Diagrams | Private |
| `/about` | About | Public |
| `/contact` | Contact | Public |
| `/blog` | Blog | Public |
| `/pricing` | Pricing | Public |

---

## Author

**Tariqul Islam**
- GitHub: [@Tariqul-stack](https://github.com/Tariqul-stack)
- LinkedIn: [tariqul-islam-dev](https://linkedin.com/in/tariqul-islam-dev)
- Email: tariqul.dev0@gmail.com

---

## 📝 License

This project is licensed under the MIT License.