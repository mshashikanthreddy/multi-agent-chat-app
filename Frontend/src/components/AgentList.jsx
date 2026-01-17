import { useEffect, useState } from "react";
import api from "../api/axios";

function AgentList({ onSelect }) {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [tone, setTone] = useState("professional");
  const [error, setError] = useState("");

  const fetchAgents = async () => {
    try {
      const res = await api.get("/agents");
      setAgents(res.data);
    } catch {
      setError("Failed to load agents");
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const createAgent = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !systemPrompt) {
      setError("Name and prompt are required");
      return;
    }

    try {
      await api.post("/agents", { name, systemPrompt, tone });
      setName("");
      setSystemPrompt("");
      setTone("professional");
      fetchAgents(); // refresh list
    } catch {
      setError("Failed to create agent");
    }
  };

  return (
    <div style={{ width: 260, borderRight: "1px solid #ddd", padding: 10 }}>
      <h4>Agents</h4>

      {agents.map((a) => (
        <div
          key={a._id}
          style={{ cursor: "pointer", padding: "6px 0" }}
          onClick={() => onSelect(a)}
        >
          {a.name}
        </div>
      ))}

      <hr />

      <h4>Create Agent</h4>
      <form onSubmit={createAgent}>
        <input
          placeholder="Agent name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="System prompt"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
        />
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="professional">Professional</option>
          <option value="friendly">Friendly</option>
          <option value="strict">Strict</option>
        </select>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AgentList;

