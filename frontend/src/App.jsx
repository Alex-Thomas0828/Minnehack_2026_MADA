import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { supabase } from "./lib/supabase";

import MendMap from "./components/Map";
import AuthPage from "./pages/AuthPage";
import MendDetails from "./components/MendDetails";

// New pages
import ChooseRolePage from "./pages/ChooseRolePage";
import NeedHelpPage from "./pages/NeedHelpPage";
import MenderPage from "./pages/MenderPage";
import Button from "./components/ui/button";

function AppInner() {
  const [pins, setPins] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [isDropping, setIsDropping] = useState(false);
  const [droppedPin, setDroppedPin] = useState(null);

  const navigate = useNavigate();

  // Auth listener
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

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

  // When user clicks on map to drop a pin
  const handlePointSelection = (lat, lng) => {
    if (!isDropping) return;

    const pin = { lat, lng };
    setDroppedPin(pin);
    setIsDropping(false);

    // Redirect to choose-role page with pin data
    navigate("/choose-role", { state: { droppedPin: pin } });
  };

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      {/* New pages */}
      <Route path="/choose-role" element={<ChooseRolePage />} />
      <Route path="/need-help" element={<NeedHelpPage />} />
      <Route path="/i-can-help" element={<MenderPage />} />

      {/* Protected map */}
      <Route
        path="/"
        element={
          user ? (
            <div className="flex flex-col h-screen w-screen overflow-hidden">
              <header className="bg-mend-dark p-4 flex justify-between items-center shadow-md z-1000">
                <h1 className="text-white text-xl font-bold">The MSP Mend</h1>
                <Button
                  onClick={() => {
                    setIsDropping(prev => !prev);
                    setDroppedPin(null);
                  }}
                  variant={isDropping ? "destructive" : "primary"}
                  shape="circle"
                  className="px-4 text-sm text-white"
                >
                  {isDropping ? "Cancel" : "+ Drop a Pin"}
                </Button>
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
              </main>
            </div>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
