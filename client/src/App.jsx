import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import logo from "./assets/logo.svg";

import Home from "./pages/Home";
import Character from "./pages/Character";

function App() {
  return (
    <Router>
      <header className="m-4">
        <Link to="/">
          <div>
            <img src={logo} alt="Logo" />
          </div>
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character" element={<Character />} />
      </Routes>
    </Router>
  );
}

export default App;
