import React, { useState } from "react";
import { callGeminiApi } from "../../api";

const ChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await callGeminiApi(input);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response || "I couldn't process that." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error occurred, try again later." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chat-modal">
      <div className="chat-header">
        <h3>Chatbot</h3>
        <button onClick={onClose}>X</button>
      </div>
      <div className="chat-body">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.sender === "user" ? "user-message" : "bot-message"}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatModal;
