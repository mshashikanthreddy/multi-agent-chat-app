function ChatWindow({ agent }) {
  if (!agent) {
    return <div style={{ flex: 1, padding: 10 }}>Select an agent to start chat</div>;
  }

  return (
    <div style={{ flex: 1, padding: 10 }}>
      <h4>Chat with {agent.name}</h4>
      <p>(Chat UI coming next)</p>
    </div>
  );
}

export default ChatWindow;

