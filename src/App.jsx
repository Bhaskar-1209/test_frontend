import React, { useState } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Upload from "./Components/Upload";
import MyUploads from "./Components/MyUpload";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div style={{ padding: "20px" }}>
        {showRegister ? (
          <>
            <Register onRegistered={() => setShowRegister(false)} />
            <button onClick={() => setShowRegister(false)}>Back to Login</button>
          </>
        ) : (
          <>
            <Login onLogin={() => setLoggedIn(true)} />
            <button onClick={() => setShowRegister(true)}>Register</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleLogout}>Logout</button>
      <Upload />
      <MyUploads />
    </div>
  );
};

export default App;
