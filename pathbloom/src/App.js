// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateLanding from './CreateLanding';
import LoginPage from './LoginPage'

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateLanding />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
