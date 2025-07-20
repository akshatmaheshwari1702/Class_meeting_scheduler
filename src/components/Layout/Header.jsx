import React from "react";

const Header = () => {
  return (
    <header style={headerStyles}>
      <h1>Class Meeting Scheduler</h1>
      <p>Schedule and manage student meetings efficiently</p>
    </header>
  );
};

const headerStyles = {
  backgroundColor: "#2c3e50",
  color: "white",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

export default Header;