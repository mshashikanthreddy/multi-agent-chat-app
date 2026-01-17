import Header from "../components/Header";
import AgentList from "../components/AgentList";
import ChatWindow from "../components/ChatWindow";

function Dashboard() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <div style={{ flex: 1, display: "flex" }}>
        <AgentList />
        <ChatWindow />
      </div>
    </div>
  );
}

export default Dashboard;


