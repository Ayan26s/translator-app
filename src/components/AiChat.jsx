import { useState } from "react";
import { IconX, IconMessageChatbot, IconSend } from "@tabler/icons-react";

function AiChat({ onClose }) {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, role: "ai", text: "Hello! I am your dummy AI assistant. How can I help you today?" }
  ]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    // 1. Instantly add your message to the screen
    const newUserMsg = { id: Date.now(), role: "user", text: chatInput };
    setChatMessages((prev) => [...prev, newUserMsg]);
    setChatInput(""); // Clear the typing box

    // 2. Fake a delay, then make the "AI" reply
    setTimeout(() => {
      const dummyReply = { 
        id: Date.now() + 1, 
        role: "ai", 
        text: "That is a great question, but I am just a dummy bot! Connect me to a real API soon." 
      };
      setChatMessages((prev) => [...prev, dummyReply]);
    }, 1000);
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#1a1a2e] bg-opacity-95 backdrop-blur-sm p-6 flex flex-col rounded-xl overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4 mt-4 pb-4 border-b border-gray-700">
        <div className="flex items-center gap-x-2">
          <IconMessageChatbot className="text-2xl text-[#b6f492]" />
          <h2 className="text-white text-xl font-bold">AI Assistant</h2>
        </div>
        <IconX 
          className="text-2xl text-gray-300 hover:text-white cursor-pointer transition-colors" 
          onClick={onClose} 
        />
      </div>
      
      {/* Chat History Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-y-4 pb-4">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === "user" 
                ? "bg-gradient-to-r from-[#338b93] to-[#10646b] text-white rounded-br-none" 
                : "bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Typing Area at the bottom */}
      <div className="mt-2 flex items-center gap-x-2">
        <input 
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask me anything..."
          className="flex-1 bg-gray-800 text-gray-200 rounded-full px-4 py-3 border border-gray-700 focus:outline-none focus:border-[#b6f492] transition-colors text-sm"
        />
        <button 
          onClick={handleSendMessage}
          className="bg-gradient-to-r from-[#b6f492] to-[#74c1a3] text-gray-900 p-3 rounded-full hover:scale-105 active:scale-95 transition-transform flex justify-center items-center shadow-md"
        >
          <IconSend className="text-xl" />
        </button>
      </div>

    </div>
  );
}

export default AiChat;