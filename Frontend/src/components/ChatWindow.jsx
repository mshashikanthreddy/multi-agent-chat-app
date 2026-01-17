import React from 'react';
import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import './ChatWindow.css';

function ChatWindow({ agent }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);


  useEffect(() => {
  if (!agent) return;

  const loadHistory = async () => {
    try {
      const res = await api.get(`/agents/${agent._id}/messages`);
      setMessages(res.data.data|| []);
    } catch {
      setMessages([]);
    }
  };

  loadHistory();
}, [agent?._id]); 


  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post(`/agents/${agent._id}/chat`, {
        message: userMsg.content
      });

      const aiMsg = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error getting response" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='chat-window'>
      {!agent ? (
    <div className="chat-window">
      <div className="chat-header">
        <h4>Select an agent to start chatting</h4>
      </div>
    </div>
  ) : (
    <>
      <div className='chat-header'>
      <h4>Chat with 🤖 {agent.agentName}</h4>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.role}`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="chat-message assistant">
            Typing…
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </>)}
    </div>
)}

export default ChatWindow;


