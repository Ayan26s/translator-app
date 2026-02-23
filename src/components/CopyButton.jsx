import React, { useState } from 'react';
import { IconCopy, IconCheck } from "@tabler/icons-react";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 transition-all duration-300 rounded-full text-gray-400 hover:text-white"
      title="Copy to clipboard"
    >
      {/* Both icons now use the same gray-400 color logic */}
      {copied ? (
        <IconCheck size={22} className="scale-110" />
      ) : (
        <IconCopy size={22} />
      )}
    </button>
  );
};

export default CopyButton;