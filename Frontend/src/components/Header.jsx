import React from 'react';
import './Header.css';

function Header() {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className='header'>
      <div className='header-title'>
      <h3>AI Agent Builder</h3>
      </div>
      <div className='header-button'>
      <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Header;
