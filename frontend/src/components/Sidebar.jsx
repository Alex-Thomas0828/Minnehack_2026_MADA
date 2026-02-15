import { Menu } from 'lucide-react';
import { User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { getCurrentUser } from '../lib/auth';

export default function Sidebar() {
    const [activePanel, setActivePanel] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchUser = async () => {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      };
    
      fetchUser();
    }, []);

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
            {activePanel === "profile" && 
            (<> 
              <div>
                <h1>Welcome, {user.email}</h1>
              </div>
            </>)
            }
            {activePanel === "filter" && <h1>Filter Panel</h1>}
            {activePanel === "info" && (
              <>
                <div>
                  <h1>

                  Life gets busy. Sometimes you need help.
                  Sometimes you have the skills to help someone else.

                  <br />
                  This platform connects people who need a service with people who can offer that service — safely and simply.

                  <br />
                  Whether it’s tutoring, moving help, design work, tech support, or everyday tasks, you can:
                  </h1>
                </div>
              </>
            )}
          </div>
        )}
  
      </div>
    );
  }