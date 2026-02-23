import { 
  IconX, 
  IconTransfer, 
  IconMessageChatbot, // Added for AI Chat
  IconHistory,        // Added for History
  IconSettings        // Added for Settings
} from "@tabler/icons-react";
import { useRef, useEffect, useState } from "react";
import { languages } from "../languageData";

import VoiceButton from "./VoiceButton";
import SpeakerButton from "./SpeakerButton";
import CopyButton from "./CopyButton";
import AiChat from "./AiChat";
import Settings from "./Settings";

const maxChars = 200;

const getShortCode = (code) => {
  return code.split("-")[0];
};

function TranslatorApp({ onClose }) {
  const [translatedText, setTranslatedText] = useState("");

  const [showChatView, setShowChatView] = useState(false);
  const [showSettingsView, setShowSettingsView] = useState(false);


  const [selectedLanguageFrom, setSelectedLanguageFrom] = useState("en-GB");
  const [selectedLanguageTo, setSelectedLanguageTo] = useState("bn-IN");

  const [showLanguages, setShowLanguages] = useState(false);
  const [currentLanguageSelection, setCurrentLanguageSelection] = useState(null);
  const [inputText, setInputText] = useState("");

  // this line is newly added 

  const [history, setHistory] = useState([]);
  const [showHistoryView, setShowHistoryView] = useState(false);
  
  
  const dropDownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setShowLanguages(false);
    }
  };

  useEffect(() => {
    if (showLanguages) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLanguages]);

  const handleLanguageClick = (type) => {
    setCurrentLanguageSelection(type);
    setShowLanguages(true);
  };

  const handleSwapLanguage = () => {
    const temp = selectedLanguageTo;
    setSelectedLanguageTo(selectedLanguageFrom);
    setSelectedLanguageFrom(temp);
  };

  const handleLanguagesSelect = (languageCode) => {
    if (currentLanguageSelection === "from") {
      setSelectedLanguageFrom(languageCode);
    } else {
      setSelectedLanguageTo(languageCode);
    }
    setShowLanguages(false);
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setTranslatedText("");
      return;
    }

    const sourceLang = getShortCode(selectedLanguageFrom);
    const targetLang = getShortCode(selectedLanguageTo);

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          inputText
        )}&langpair=${sourceLang}|${targetLang}`
      );

      const data = await response.json();

      if (data.responseData) {
        const resultText = data.responseData.translatedText; // ADD THIS LINE
        
        setTranslatedText(resultText); //  UPDATE THIS LINE

        // the line is newly added
        setHistory((prevHistory) => [
          {
            id: Date.now(), // unique ID
            original: inputText,
            translated: resultText, //  Now this works perfectly!
            from: languages[selectedLanguageFrom],
            to: languages[selectedLanguageTo]
          },
          ...prevHistory // keep the old history
        ]);

      }

      else {
        setTranslatedText("Translation failed");
      }
    } catch (err) {
      console.log(err);
      setTranslatedText("Error occurred");
    }
  };

  const handleInputTextChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setInputText(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTranslate();
    }
  };

  const handleVoiceInput = (text) => {
    if (text.length <= maxChars) {
      setInputText(text);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-4 justify-center items-center px-6 sm:px-8 pt-12 pb-6 relative">
      <button className="absolute top-4 right-4 z-50">
        <IconX className="text-xl text-gray-300 hover:text-white transition-colors" onClick={onClose} />
      </button>
      
      {/* Language Selection Bar */}
      <div className="w-full min-h-20 flex justify-center items-center px-4 bg-gradient-to-r from-[#b6f492] to-[#338b93] text-gray-700 rounded-lg shadow-sm">
        <div 
          className="language cursor-pointer font-semibold" 
          onClick={() => handleLanguageClick("from")}
        >
          {languages[selectedLanguageFrom] || "English"}
        </div>
        <IconTransfer className="text-2xl mx-8 cursor-pointer hover:scale-110 transition-transform" onClick={handleSwapLanguage} />
        <div 
          className="language cursor-pointer font-semibold" 
          onClick={() => handleLanguageClick("to")}
        >
          {languages[selectedLanguageTo] || "English"}
        </div>
      </div>

      {/* Languages Dropdown */}
      {showLanguages && (
        <div
          ref={dropDownRef}
          className="bg-gradient-to-r from-[#b6f492] to-[#338b93] w-[calc(100%-4rem)] h-[calc(100%-9rem)] absolute top-36 left-8 z-50 rounded shadow-lg p-4 overflow-y-scroll scrollbar-hide"
        >
          <ul>
            {Object.entries(languages).map(([code, name]) => (
              <li
                key={code}
                className="cursor-pointer hover:bg-[#10646b] hover:text-white transition duration-200 p-2 rounded"
                onClick={() => handleLanguagesSelect(code)}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Input Area */}
      <div className="w-full relative">
        <textarea
          value={inputText || ""}
          onChange={handleInputTextChange}
          className="textarea text-gray-200 pb-14 w-full rounded-lg bg-gray-800 border border-gray-700 p-4"
          onKeyDown={handleKeyDown}
          placeholder="Type here..."
          rows={4}
        ></textarea>
        
        {/* Voice Button - Left Side */}
        <div className="absolute bottom-3 left-3 z-10">
          <VoiceButton 
            onSpeech={handleVoiceInput} 
            lang={selectedLanguageFrom} 
          />
        </div>
        
        {/* Character Count - Right Side */}
        <div className="absolute bottom-3 right-3 z-10 text-gray-400 text-xs font-medium bg-gray-900/80 px-2 py-1 rounded">
          {(inputText || "").length}/{maxChars}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-x-4 justify-center items-center py-2">
        <button
          onClick={handleTranslate}
          className="px-6 h-10 bg-gradient-to-r from-[#b6f492] via-[#74c1a3] to-[#338b93] bg-[length:200%_auto] hover:bg-right transition-all duration-500 rounded-lg text-xs font-black text-gray-800 uppercase tracking-widest flex justify-center items-center active:translate-y-[1px] shadow-sm border border-black/5"
        >
          Translate
        </button>

        <button
          onClick={() => {
            setInputText("");
            setTranslatedText("");
          }}
          className="px-6 h-10 bg-gradient-to-r from-[#b6f492] via-[#74c1a3] to-[#338b93] bg-[length:200%_auto] hover:bg-right transition-all duration-500 rounded-lg text-xs font-black text-gray-800 uppercase tracking-widest flex justify-center items-center active:translate-y-[1px] shadow-sm"
        >
          Clear
        </button>
      </div>

      {/* Output Area */}
      <div className="w-full relative">
        <textarea
          value={translatedText}
          className="textarea text-[#b6f492] pb-14 w-full rounded-lg bg-gray-800 border border-gray-700 p-4"
          readOnly
          rows={4}
        ></textarea>
        
        {/* Action Buttons Container - Right Side */}
        <div className="absolute bottom-3 right-3 flex items-center gap-x-2 z-10">
          <SpeakerButton 
            text={translatedText} 
            languageCode={selectedLanguageTo} 
          />
          <CopyButton text={translatedText} />
        </div>
      </div>

          {showHistoryView && (
        <div className="absolute inset-0 z-50 bg-[#1a1a2e] bg-opacity-95 backdrop-blur-sm p-6 flex flex-col rounded-xl overflow-hidden">
          <div className="flex justify-between items-center mb-6 mt-4">
            <h2 className="text-white text-xl font-bold">Translation History</h2>
            <div className="flex items-center gap-x-4">
              {history.length > 0 && (
                <button 
                  onClick={() => setHistory([])} 
                  className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-wider transition-colors"
                >
                  Clear All
                </button>
              )}
              
              <IconX 
                className="text-2xl text-gray-300 hover:text-white cursor-pointer transition-colors" 
                onClick={() => setShowHistoryView(false)} 
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-y-3 pb-6">
            {history.length === 0 ? (
              <p className="text-gray-400 text-center mt-10">No history yet. Start translating!</p>
            ) : (
              history.map((item) => (
                <div key={item.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
                  <p className="text-xs text-gray-400 font-semibold mb-2">{item.from} → {item.to}</p>
                  <p className="text-gray-200 text-sm mb-1">{item.original}</p>
                  <p className="text-[#b6f492] text-sm font-medium">{item.translated}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
{/* --- AI CHAT OVERLAY --- */}
      {showChatView && <AiChat onClose={() => setShowChatView(false)} />}

      {/* --- SETTINGS OVERLAY --- */}
      {showSettingsView && (
        <Settings 
          onClose={() => setShowSettingsView(false)} 
          onClearHistory={() => setHistory([])} 
        />
      )}

      {/* --- NEW BOTTOM ACTION BAR --- */}
      <div className="w-full flex justify-around items-center py-3 px-2 mt-2 bg-gradient-to-r from-[#b6f492] to-[#338b93] text-gray-800 rounded-lg shadow-sm">
        <button 
          className="flex flex-col items-center justify-center gap-y-1 hover:scale-105 active:scale-95 transition-transform"
          onClick={() => setShowChatView(true)}
        >
          <IconMessageChatbot className="text-2xl" />
          <span className="text-xs font-bold">AI Chat</span>
        </button>
          
        <button   // the code is upated
          onClick={() => setShowHistoryView(true)}
          className="flex flex-col items-center justify-center gap-y-1 hover:scale-105 active:scale-95 transition-transform"
        >
          <IconHistory className="text-2xl" />
          <span className="text-xs font-bold">History</span>
        </button>

        <button 
          className="flex flex-col items-center justify-center gap-y-1 hover:scale-105 active:scale-95 transition-transform"
          onClick={() => setShowSettingsView(true)}
        >
          <IconSettings className="text-2xl" />
          <span className="text-xs font-bold">Setting</span>
        </button>
      </div>

    </div>
  );
}

export default TranslatorApp;