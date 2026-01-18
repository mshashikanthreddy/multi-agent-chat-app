# Multi-Agent AI Chat Application – Local Setup

This document explains the **requirements** and **steps to run the project locally**.

---

## Requirements

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm
- MongoDB (local or MongoDB Atlas)
- Git

---

## Project Structure

```
yellow-ai-assignment/
├── Backend/
├── Frontend/
├── README.md
└── ARCHITECTURE.md
```

---

## Backend Setup

### 1. Navigate to Backend folder
```bash
cd Backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file in `Backend/`
```env
PORT=3000
MONGO_USER=your_mongodb_user
PASSWORD=your_mongodb_password
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=your_llm_model_name
```

### 4. Start backend server
```bash
npm start
```

Backend runs at:
```
http://localhost:3000
```

---

## Frontend Setup

### 1. Navigate to Frontend folder
```bash
cd ../Frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file in `Frontend/`
```env
VITE_API_URL=http://localhost:3000
```

### 4. Start frontend server
```bash
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

For deployment :

I deployed the Frontend on "vercel"
For Backend I deployed in "Render"(You sometimes expects a delay or a cold start in login/signup
it is because render backend server automatically go to sleep mode to save unneccsary maintainance charge.
Note: This is only for a free model not for paid model. )

Here is the link of this multi-agent-chat-app :
```
https://multi-agent-chat-app-jet.vercel.app/
```
This is file you must pass on to the Frontend. so, update vite url in .env
```env
VITE_API_URL = https://multi-agent-chat-app-jet.vercel.app/
```
please unable cors for this "URL" or for all (app.use(cors());)

For proper deployment setup and requiremnts you get more information from following these sites
which i attach below or ask chatgpt,perplexity or any other AI LLM.
```
Frontend = https://vercel.com/docs
Backend = https://render.com/docs/your-first-deploy
For LLM Integration : https://openrouter.ai/models
```

## Notes

- Backend must be running for frontend to work
- API keys , Database credentials , Secret keys and other keys stored in .env must never be committed
- .env and node_modules name should be add to .gitignore.
