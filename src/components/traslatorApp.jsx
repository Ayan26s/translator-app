import { IconX, IconTransfer, IconChevronDown } from "@tabler/icons-react";
import { useRef, useEffect, useState } from "react";
import { languages } from "../languageData";
const maxChars = 200;

function TranslatorApp({ onClose }) {
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguageFrom, setSelectedLanguageFrom] = useState("en");
  const [selectedLanguageTo, setSelectedLanguageTo] = useState("en");
  const [showLanguages, setShowLanguages] = useState(false);
  const [currentLanguageSelection, setCurrentLanguageSelection] =
    useState(null);
  const [inputText, setInputText] = useState("");
  const [charCount, setCharCount] = useState(0);
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
    setSelectedLanguageFrom(selectedLanguageTo);
    setSelectedLanguageTo(selectedLanguageFrom);
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
    if (!inputText.trim().length) {
      setTranslatedText("");
      return;
    }
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          inputText
        )}&langpair=${selectedLanguageFrom}|${selectedLanguageTo}`
      );
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputTextChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setInputText(value);
      setCharCount(value.length);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTranslate();
    }
  };
  return (
    <div className="w-full flex flex-col gap-y-4 justify-center items-center px-6 sm:px-8 pt-12 pb-6 relative">
      <button className="absolute top-4 right-4">
        <IconX className="text-xl text-gray-300" onClick={onClose} />
      </button>
      <div className="w-full min-h-20 flex justify-center items-center px-4 bg-gradient-to-r from-[#b6f492] to-[#338b93] text-gray-700 rounded-lg">
        <div className="language" onClick={() => handleLanguageClick("from")}>
          {languages[selectedLanguageFrom] || "English"}
        </div>
        <IconTransfer className="text-2xl mx-8" onClick={handleSwapLanguage} />
        <div className="language" onClick={() => handleLanguageClick("to")}>
          {languages[selectedLanguageTo] || "English"}
        </div>
      </div>
      {showLanguages && (
        <div
          ref={dropDownRef}
          className="bg-gradient-to-r from-[#b6f492] to-[#338b93] w-[calc(100%-4rem)] h-[calc(100%-9rem)] absolute top-36 left-8 z-10 rounded shadow-lg p-4 overflow-y-scroll scrollbar-hide"
        >
          <ul>
            {Object.entries(languages).map(([code, name]) => (
              <li
                key={code}
                className="cursor-pointer hover:bg[#10646b] transition duration-200 p-2 rounded"
                onClick={() => handleLanguagesSelect(code)}
              >
                {name}
              </li>
            ))}

            <li />
          </ul>
        </div>
      )}

      <div className="w-full relative">
        <textarea
          value={inputText || ""}
          onChange={handleInputTextChange}
          className="textarea text-gray-200"
          onKeyDown={handleKeyDown}
        ></textarea>
        <div className="absolute botton-2 right-4 text-gray-400">
          {charCount}/{maxChars}
        </div>
      </div>
      <button
        onClick={handleTranslate}
        className="w-12 h-12 bg-gradient-to-r from-[#b6f492] to-[#338b93] rounded-full text-2xl text-gray-600 flex justify-center items-center active:translate-y-[1px]"
      >
        <IconChevronDown />
      </button>
      <div className="w-full">
        <textarea
          value={translatedText}
          className="textarea text-[#b6f492]"
          readOnly
        ></textarea>
      </div>
    </div>
  );
}

export default TranslatorApp;
