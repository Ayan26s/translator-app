import React, { useState } from 'react';
import { IconVolume } from "@tabler/icons-react";

const SpeakerButton = ({ text, languageCode }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (!text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Uses your selectedLanguageTo (e.g., 'bn-IN' or 'en-GB')
    utterance.lang = languageCode || 'en-US';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button 
      onClick={handleSpeak}
      className={`relative p-2 transition-all duration-300 rounded-full flex items-center justify-center ${
        isSpeaking ? "text-[#b6f492] scale-125" : "text-gray-400 hover:text-white"
      }`}
      title="Listen to translation"
    >
      {/* 1. BIGGER VIBRATION RING */}
      {isSpeaking && (
        <span className="absolute inset-0 rounded-full bg-[#b6f492] opacity-75 animate-ping"></span>
      )}
      
      {/* 2. GLOWING BACKDROP */}
      {isSpeaking && (
        <span className="absolute inset-0 rounded-full bg-[#b6f492]/20 blur-sm"></span>
      )}
      
      {/* 3. PULSING ICON */}
      <IconVolume 
        size={24} 
        className={`relative z-10 ${isSpeaking ? "animate-bounce" : ""}`} 
      />
    </button>
  );
};

export default SpeakerButton;