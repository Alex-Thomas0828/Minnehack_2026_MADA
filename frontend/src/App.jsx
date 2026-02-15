import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from "./lib/supabase";

import MendMap from "./components/Map";
import AuthPage from "./pages/AuthPage";
import MendDetails from "./components/MendDetails";

function App() {
  const [pins, setPins] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [isDropping, setIsDropping] = useState(false);
  const [droppedPin, setDroppedPin] = useState(null);

  // Check auth state on load
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    // Listen for login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch pins
  useEffect(() => {
    const getPins = async () => {
      const [
        { data: helpData },
        { data: serviceData },
        { data: usersData },
        { data: pinpointsData },
      ] = await Promise.all([
        supabase.from('Help').select('*'),
        supabase.from('Service').select('*'),
        supabase.from('users').select('*'),
        supabase.from('Mapping Pinpoints').select('*'),
      ]);

      const usersById = {};
      (usersData || []).forEach(u => { usersById[u.id] = u; });

      const pinpointsByUserId = {};
      (pinpointsData || []).forEach(mp => { pinpointsByUserId[mp.user_id] = mp; });

      const helpPins = (helpData || []).map(p => {
        const userInfo = usersById[p.auth_id] || {};
        const pinpoint = pinpointsByUserId[p.demander_id] || {};
        return {
          ...p,
          is_demander: true,
          user_name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          socials: userInfo.socials,
          category: pinpoint.category,
          is_resolved: pinpoint.is_resolved,
          created_at: userInfo.created_at,
        };
      });

      const servicePins = (serviceData || []).map(p => {
        const pinpoint = pinpointsByUserId[p.supplier_id] || {};
        const userInfo = Object.values(usersById).find(u => u.name === p.name) || {};
        return {
          ...p,
          is_demander: false,
          user_name: userInfo.name || p.name,
          email: userInfo.email,
          phone: userInfo.phone,
          socials: userInfo.socials,
          category: pinpoint.category,
          is_resolved: pinpoint.is_resolved,
          created_at: userInfo.created_at,
        };
      });

      setPins([...helpPins, ...servicePins]);
    };

    getPins();
  }, []);

  const handlePointSelection = (lat, lng) => {
    if (!isDropping) return;
    setDroppedPin({ lat, lng });
    setIsDropping(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Auth Page */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Map Page */}
        <Route
          path="/"
          element={
            user ? (
              <div className="flex flex-col h-screen w-screen overflow-hidden">
                <header className="bg-mend-dark p-4 flex justify-between items-center shadow-md z-[1000]">
                  <h1 className="text-mend-white text-xl font-bold">The MSP Mend</h1>
                  <button
                    onClick={() => {
                      setIsDropping((prev) => !prev);
                      setDroppedPin(null);
                    }}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${
                      isDropping
                        ? "bg-red-500 text-white"
                        : "bg-mend-cyan text-mend-dark"
                    }`}
                  >
                    {isDropping ? "Cancel" : "+ Drop a Pin"}
                  </button>
                </header>

                {isDropping && (
                  <div className="bg-yellow-100 text-yellow-800 text-center text-sm py-2 font-medium">
                    Click on the map to drop your pin
                  </div>
                )}

                <main className="flex-1 min-h-0 relative">
                  <MendMap
                    pins={pins}
                    onLocationSelect={handlePointSelection}
                    onPinClick={setSelectedPin}
                    isDropping={isDropping}
                    droppedPin={droppedPin}
                  />
                  {selectedPin && (
                    <MendDetails pin={selectedPin} onClose={() => setSelectedPin(null)} />
                  )}

                  {droppedPin && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl px-6 py-4 z-[1000] text-center">
                      <p className="text-sm font-bold text-mend-dark mb-1">Pin Dropped</p>
                      <p className="text-xs text-slate-500">
                        Lat: {droppedPin.lat.toFixed(6)}, Lng: {droppedPin.lng.toFixed(6)}
                      </p>
                      <button
                        onClick={() => setDroppedPin(null)}
                        className="mt-3 text-xs text-red-500 hover:underline"
                      >
                        Remove pin
                      </button>
                    </div>
                  )}
                </main>
              </div>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
