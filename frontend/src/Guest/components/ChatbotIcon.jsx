import React, { useState } from "react";
import ChatModal from "./ChatModal";
import "./../styles/chatbot.css"; // Import chatbot styles
import chatbotImage from "./../assets/chatbot.png"; // Import the image properly

const ChatbotIcon = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div
        className="chatbot-icon"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <img src={chatbotImage} alt="Chat" />
      </div>
      {isChatOpen && <ChatModal onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default ChatbotIcon;
