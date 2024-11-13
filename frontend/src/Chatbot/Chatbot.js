import React, { useState } from 'react';
import './Chatbot.css';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.reply, sender: 'bot' },
        ]);
      } else {
        const errorData = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `Error: ${errorData.message}`, sender: 'bot' },
        ]);
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Error: ${error.message}`, sender: 'bot' },
      ]);
    }
  };

  return (
    <div className="Chatbot">
      <NavBar />
      <main className="Chatbot-main">
        <h1>Chat with ChemoCompanion</h1>
        <div className="chatbot-container">
          <div className="chatbox">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message here..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Chatbot;