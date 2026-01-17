import React from 'react';
import './AgentList.css';
import { useEffect, useState } from "react";
import api from "../api/axios";

function AgentList({ onSelect , agent }) {
  const [agents, setAgents] = useState([]);
  const [agentName, setName] = useState("");
  const [prompt, setSystemPrompt] = useState("");
  const [tone, setTone] = useState("professional");
  const [error, setError] = useState("");

  const fetchAgents = async () => {
    try {
      const res = await api.get("/agents");
      setAgents(res.data.data);
      console.log(res.data.data);
    } catch {
      setError("Failed to load agents");
    }
  };

  useEffect(() => {
    fetchAgents()
  }, []);

  const createAgent = async (e) => {
    e.preventDefault();
    setError("");

    if (!agentName || !prompt) {
      setError("Name and prompt are required");
      return;
    }

    try {
      await api.post("/agents", { agentName, prompt, tone });
      setName("");
      setSystemPrompt("");
      setTone("professional");
      fetchAgents(); // refresh list
    } catch {
      setError("Failed to create agent");
    }
  };

  return (
    <div className='agent-list'>
      <h4>Agents</h4>

      {agents.map((a) => (
        <div
      key={a._id}
      className={`agent-item ${agent?._id === a._id ? "active" : ""}`}
      onClick={() => onSelect(a)}
    >
      🤖 {a.agentName} 
    </div>
      ))}

      <hr />

      <h4>Create Agent</h4>
      <div className='agent-form'>
      <form onSubmit={createAgent}>
        <input
          placeholder="Agent-Name"
          value={agentName}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="SystemPrompt"
          value={prompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
        />
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="professional">Professional</option>
          <option value="friendly">Friendly</option>
          <option value="candid">Candid</option>
        </select>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Create</button>
      </form>
      </div>
    </div>
  );
}

export default AgentList;

