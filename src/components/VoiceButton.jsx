// VoiceButton.jsx
import React, { useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { IconMicrophone } from "@tabler/icons-react";

const VoiceButton = ({ onSpeech, selectedLanguageFrom }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // This ref holds the 10-second "Silence Timer"
  const silenceTimerRef = useRef(null);

  // LOGIC: Every time the transcript changes (someone is speaking), 
  // we clear the old timer and start a fresh 10-second countdown.
  useEffect(() => {
    if (listening) {
      // 1. Send text to parent
      onSpeech(transcript);

      // 2. Reset the 10-second silence clock
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      
      silenceTimerRef.current = setTimeout(() => {
        console.log("10 seconds of silence detected. Turning off...");
        SpeechRecognition.stopListening();
      }, 3000); // 3000ms = 3s
    }
  }, [transcript, listening, onSpeech]);

  // Cleanup: prevent memory leaks if component unmounts
  useEffect(() => {
    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleVoiceButtonClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ 
        continuous: true, 
        language: selectedLanguageFrom || 'en-IN' 
      });
      
      // Start initial 10s timer in case they click but never speak
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        SpeechRecognition.stopListening();
      }, 10000);
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center p-2">
      {/* Vibration Rings: Light Green #b6f492 */}
      {listening && (
        <>
          <div className="absolute inset-0 rounded-full bg-[#b6f492] opacity-40 animate-ping"></div>
          <div className="absolute inset-2 rounded-full bg-[#b6f492] opacity-20 animate-[ping_1.5s_infinite]"></div>
        </>
      )}

      {/* Button: Teal Green #338b93 */}
      <button
        onClick={handleVoiceButtonClick}
        className={`relative z-10 p-3 rounded-full transition-all duration-300 ${
          listening 
            ? "bg-[#338b93] text-white shadow-[0_0_20px_rgba(51,139,147,0.5)] scale-110" 
            : "text-gray-400 hover:text-[#338b93] hover:bg-gray-100"
        }`}
      >
        <IconMicrophone size={24} stroke={2.5} />
      </button>
    </div>
  );
};

export default VoiceButton;