import React, { useState } from "react";
import { callGeminiApi } from "../../api"; // Adjust import based on API location

const GeminiChatbot = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setChatVisible(!chatVisible);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await callGeminiApi(input);
      const botMessage = { sender: "bot", text: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20 }}>
      {chatVisible ? (
        <div style={{ border: "1px solid #ccc", padding: 10, width: 300 }}>
          <div style={{ maxHeight: 300, overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "5px 0",
                }}
              >
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={{ width: "calc(100% - 50px)", marginRight: 5 }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      ) : (
        <button onClick={toggleChat}></button>
      )}
    </div>
  );
};

export default GeminiChatbot;
