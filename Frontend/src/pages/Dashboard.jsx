function Dashboard() {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>Dashboard</h2>
    </div>
  );
}

export default Dashboard;


