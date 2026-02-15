import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import MendMap from "./components/Map";

function App() {
  const [pins, setPins] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDropping, setIsDropping] = useState(false);

  const fetchPins = async () => {
    const { data: helpData } = await supabase
      .from("Help")
      .select(`help_id, name, description, location`);
    const { data: serviceData } = await supabase
      .from("Service")
      .select(`service_id, name, description, location`);

    // DEBUGING LOG
    console.log("Sample Data:", helpData?.[0]?.location);

    const helpPins = (helpData || []).map((p) => ({ ...p, is_demander: true }));
    const servicePins = (serviceData || []).map((p) => ({
      ...p,
      is_demander: false,
    }));

    setPins([...helpPins, ...servicePins]);
  };

  useEffect(() => {
    fetchPins();
  }, []);

  const handlePointSelection = (lat, lng) => {
    if (!isDropping) return;
    setSelectedLocation({ lat, lng });
    setShowModal(true);
    setIsDropping(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLocation(null);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <header className="bg-mend-dark p-4 flex justify-between items-center shadow-md z-[1000]">
        <h1 className="text-mend-white text-xl font-bold">The MSP Mend</h1>
        <button
          onClick={() => setIsDropping((prev) => !prev)}
          className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${
            isDropping
              ? "bg-mend-gold text-mend-dark"
              : "bg-mend-cyan text-mend-dark"
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

      {showModal && selectedLocation && (
        <AddMendModal
          selectedLocation={selectedLocation}
          onClose={handleCloseModal}
          onPinAdded={fetchPins}
        />
      )}
    </div>
  );
}

export default App;
