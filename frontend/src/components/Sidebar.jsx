import { Menu } from 'lucide-react';
import { User } from 'lucide-react';
import { useState } from 'react';
import { Info } from 'lucide-react';

export default function Sidebar() {
    const [activePanel, setActivePanel] = useState(null);

    function togglePanel(panel) {
      setActivePanel(prev => (prev === panel ? null : panel));
    }
  
    return (
      <div className="flex h-screen relative">
  
        {/* SIDEBAR */}
        <div className="w-20 bg-[var(--color-mend-dark)] text-white flex flex-col items-center py-6">
          <div className="flex flex-col space-y-6 w-full items-center">
  
            <button
              className="flex items-center justify-center w-12 h-12 rounded-lg hover:bg-gray-800"
              onClick={() => togglePanel("profile")}
            >
              <User />
            </button>
  
            <button
              className="flex items-center justify-center w-12 h-12 rounded-lg hover:bg-gray-800"
              onClick={() => togglePanel("filter")}
            >
              <Menu />
            </button>
  
            <button 
                className="flex items-center justify-center w-12 h-12 rounded-lg hover:bg-gray-800"
                onClick={() => togglePanel("info")}
            >
              <Info />
            </button>
  
          </div>
        </div>
  
        {/* EXTRA SIDEBAR */}
        {activePanel && (
          <div className="w-64 bg-white text-black shadow-lg p-6">
            {activePanel === "profile" && <h1>Profile Panel</h1>}
            {activePanel === "filter" && <h1>Filter Panel</h1>}
            {activePanel === "info" && <h1>Info Panel</h1>}
          </div>
        )}
  
      </div>
    );
  }