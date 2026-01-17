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

## Notes

- Backend must be running for frontend to work
- API keys must never be committed
