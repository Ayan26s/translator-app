import { useState } from "react";
import TranslatorApp from "./components/traslatorApp";
import TranslatorStart from "./components/translatorStart";
import "./App.css";

function App() {
  const [showTranslatorApp, setShowTranslatorApp] = useState(false);

  const handleToggle = () => {
    setShowTranslatorApp(!showTranslatorApp);
  };
  return (
    <div className="w-[90%] max-w-lg max-[392px]:h-[90%] sm:h-auto flex flex-col rounded-xl shadow-xl shadow-gray-800 bg-[#2d2d2d]">
      {showTranslatorApp ? (
        <TranslatorApp onClose={handleToggle} />
      ) : (
        <TranslatorStart onStart={handleToggle} />
      )}
    </div>
  );
}

export default App;
