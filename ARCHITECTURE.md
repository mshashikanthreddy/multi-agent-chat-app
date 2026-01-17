# Architecture & Design – Multi-Agent AI Chat Application

This document explains the **project idea, architecture, design decisions, and tech stack**.

---

## Project Overview

This project is a **multi-agent AI chat platform** where users can create and interact with multiple AI agents.
Each agent has its own configuration and isolated conversation history.

---

## High-Level Architecture

```
Frontend (React)
   |
   |  HTTP (Axios + JWT)
   v
Backend (Node.js + Express)
   |
   |  Mongoose
   v
MongoDB
   |
   |  Prompt + Context
   v
LLM Provider (OpenRouter)
```

---

## Frontend

- React (Vite)
- Axios for API communication
- State-driven agent selection
- Stateless UI components

---

## Backend

- Node.js & Express
- JWT authentication
- Agent ownership validation
- Chat history persistence

---

## Database Design

### User
- name
- email
- password (hashed)

### Agent
- agentName
- tone
- prompt
- userId

### Message
- agentId
- role (user/assistant)
- content
- timestamps

---

## Design Decisions

- No WebSockets (HTTP-based simplicity)
- Per-agent isolated context
- Secure backend-only API keys

---

## Conclusion

The project demonstrates scalable backend design, secure LLM integration, and clean frontend architecture.
