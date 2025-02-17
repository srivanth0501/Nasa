import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Astronomy from './Pages/Apod';
import Mars from './Pages/Mars';
import './Pages/Global.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/astronomy" element={<Astronomy />} />
        <Route path="/mars" element={<Mars />} />
      </Routes>
    </Router>
  );
}

export default App;
