import React from 'react';
import { useState } from "react";
import Header from "../components/Header";
import AgentList from "../components/AgentList";
import ChatWindow from "../components/ChatWindow";
import './Dashboard.css';

function Dashboard() {
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <div className='dashboard'>
      <Header />
      <div className='dashboard-body'>
        <AgentList onSelect={setSelectedAgent} agent={selectedAgent} />
        <ChatWindow agent={selectedAgent} />
      </div>
    </div>
  );
}

export default Dashboard;





