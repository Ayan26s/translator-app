import { IconX, IconKey, IconTrash } from "@tabler/icons-react";

function Settings({ onClose, onClearHistory }) {
  return (
    <div className="absolute inset-0 z-50 bg-[#1a1a2e] bg-opacity-95 backdrop-blur-sm p-6 flex flex-col rounded-xl overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 mt-4 pb-4 border-b border-gray-700">
        <h2 className="text-white text-xl font-bold">Settings</h2>
        <IconX 
          className="text-2xl text-gray-300 hover:text-white cursor-pointer transition-colors" 
          onClick={onClose} 
        />
      </div>

      <div className="flex flex-col gap-y-6">
        
        
        {/* Data Management */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
          <div className="flex items-center gap-x-2 mb-2">
            <IconTrash className="text-red-400" size={20} />
            <h3 className="text-white font-semibold">Data Management</h3>
          </div>
          <p className="text-xs text-gray-400 mb-3">
            Clear all your saved translation history from this device.
          </p>
          <button 
            onClick={() => {
              onClearHistory();
              onClose(); // Close settings after deleting
            }}
            className="w-full py-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 rounded-lg text-sm font-bold transition-colors flex justify-center items-center gap-x-2"
          >
            Delete All History
          </button>
        </div>

      </div>
    </div>
  );
}

export default Settings;