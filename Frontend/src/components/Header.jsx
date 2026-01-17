function Header() {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        borderBottom: "1px solid #ddd"
      }}
    >
      <h3>AI Agent Builder</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Header;
