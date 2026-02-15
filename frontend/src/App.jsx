import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import MendMap from "./components/Map";

function App() {
  const [pins, setPins] = useState([]);
  const [isDropping, setIsDropping] = useState(false);

  const fetchPins = async () => {
  const { data: helpData, error: helpError } = await supabase.from("Help").select(`*`);
  const { data: serviceData, error: serviceError } = await supabase.from("Service").select(`*`);

  if (helpError) console.error("Help Fetch Error:", helpError);
  if (serviceError) console.error("Service Fetch Error:", serviceError);

  const helpPins = (helpData || []).map((p) => ({ ...p, is_demander: true }));
  const servicePins = (serviceData || []).map((p) => ({ ...p, is_demander: false }));

  console.log("Total pins to render:", helpPins.length + servicePins.length);
  setPins([...helpPins, ...servicePins]);
};

  useEffect(() => {
    fetchPins();
  }, []);

  const handlePointSelection = (lat, lng) => {
    if (!isDropping) return;
    console.log("Point Selected:", lat, lng);
    setIsDropping(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <header className="bg-mend-dark p-4 flex justify-between items-center shadow-md z-[1000]">
        <h1 className="text-mend-white text-xl font-bold">The MSP Mend</h1>
        <button
          onClick={() => setIsDropping((prev) => !prev)}
          className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${
            isDropping ? "bg-mend-gold text-mend-dark" : "bg-mend-cyan text-mend-dark"
          }`}
        >
          {isDropping ? "Cancel" : "+ Drop a Pin"}
        </button>
      </header>

      {isDropping && (
        <div className="bg-mend-blue text-white text-center text-sm py-2 font-medium z-[999]">
          Click on the map to choose a location
        </div>
      )}

      <main className="flex-1">
        <MendMap pins={pins} onLocationSelect={handlePointSelection} />
      </main>

    </div>
  );
}

export default App;