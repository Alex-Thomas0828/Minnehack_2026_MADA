import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from "./lib/supabase";

import MendMap from "./components/Map";
import AuthPage from "./pages/AuthPage";
import MapKey from "./components/MapKey";
import MendDetails from "./components/MendDetails";

function App() {
  const [pins, setPins] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);

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
      const { data: helpData } = await supabase.from('Help').select('*');
      const { data: serviceData } = await supabase.from('Service').select('*');

      const helpPins = (helpData || []).map(p => ({ ...p, is_demander: true }));
      const servicePins = (serviceData || []).map(p => ({ ...p, is_demander: false }));

      setPins([...helpPins, ...servicePins]);
    };

    getPins();
  }, []);

  const handlePointSelection = (lat, lng) => {
    console.log("Point clicked at:", lat, lng);
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
                  <button className="bg-mend-cyan text-mend-dark px-4 py-2 rounded-full font-bold text-sm">
                    + Drop a Pin
                  </button>
                </header>

                <main className="flex-1 relative">
                  <MendMap pins={pins} onLocationSelect={handlePointSelection} onPinClick={setSelectedPin} />
                  <MapKey />
                  {selectedPin && (
                    <MendDetails pin={selectedPin} onClose={() => setSelectedPin(null)} />
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
