import { useState } from "react";
import Header from "../components/Header";
import AgentList from "../components/AgentList";
import ChatWindow from "../components/ChatWindow";

function Dashboard() {
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ flex: 1, display: "flex" }}>
        <AgentList onSelect={setSelectedAgent} />
        <ChatWindow agent={selectedAgent} />
      </div>
    </div>
  );
}

export default Dashboard;





