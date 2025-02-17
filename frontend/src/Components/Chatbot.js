import React, { useState } from "react";
import axios from "axios";
import { FaRobot, FaUser } from "react-icons/fa";
import "./Chatbot.css"; 

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;
    try {
      const response = await axios.post("http://localhost:5000/api/chatbot", { question: input });
      setMessages([...messages, { user: input, bot: response.data.response }]);
      setInput("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header"> NASA AI Chatbot</div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <p key={index} className="chat-message">
            <FaUser className="user-icon" /> <strong>You:</strong> {msg.user} <br />
            <FaRobot className="bot-icon" /> <strong>Bot:</strong> {msg.bot}
          </p>
        ))}
      </div>
      <div className="chatbot-container">
        <h2> NASA AI Chatbot</h2>
        <div className="chat-window">
          {messages.map((msg, index) => (
            <p key={index}>
              <strong> You:</strong> {msg.user} <br />
              <strong> Bot:</strong> {msg.bot}
            </p>
          ))}
        </div>


        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about NASA..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
