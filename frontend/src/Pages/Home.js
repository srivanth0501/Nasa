import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProtectedData } from '../Services/Api';
import Chatbot from '../Components/Chatbot';
import { FaPowerOff, FaRobot } from "react-icons/fa"; // 🔹 Import Icons
import '../Pages/Home.css';
import '../App.css';

const Home = () => {
  const [message, setMessage] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        const data = await fetchProtectedData(token);
        setMessage(data.message);
      } catch (err) {
        navigate('/');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="home-page">
      {/* 🔹 Floating Logout Button */}
      <button className="logout-button" onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>
        <FaPowerOff />
      </button>

      {/* 🔹 NASA Portal Header */}
      <h1 className="home-title">Welcome to NASA Portal</h1>
      <p className="home-message">{message}</p>

      {/* 🔹 Feature Cards */}
      <div className="options-container">
        <button className="option-card mars" onClick={() => navigate('/mars')} aria-label="Mars Rover Page">
          <h2>Mars Rover</h2>
        </button>
        <button className="option-card astronomy" onClick={() => navigate('/astronomy')} aria-label="APOD Page">
          <h2>APOD</h2>
        </button>
      </div>

      {/* 🔹 Floating Chatbot Button */}
      <button className="chatbot-toggle" onClick={() => setShowChatbot(!showChatbot)}>
        <FaRobot />
      </button>

      {/* 🔹 Show Chatbot when toggled */}
      {showChatbot && <Chatbot />}
    </div>
  );
};

export default Home;
