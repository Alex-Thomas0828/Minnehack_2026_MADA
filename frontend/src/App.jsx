import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase"; 
import MendMap from "./components/Map";


function App() {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const getPins = async () => {
      const {data: helpData} = await supabase.from('Help').select('*');
      const { data: serviceData} = await supabase.from('Service').select('*');

      const helpPins = (helpData || []).map(p => ({...p, is_demander: true}));
      const servicePins = (serviceData || []).map(p => ({ ...p, is_demander: false}));

      setPins([...helpPins, ...servicePins]);
    }
  })

  const handlePointSelection = (lat, lng) => {
    console.log("Point clicked at:", lat, lng);
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <header className="bg-mend-dark p-4 flex justify-between items-center shadow-md z-[1000]">
        <h1 className="text-mend-white text-xl font-bold">The MSP Mend</h1>
        <button className="bg-mend-cyan text-mend-dark px-4 py-2 rounded-full font-bold text-sm">
          + Drop a Pin
        </button>
      </header>

      <main className="flex-1">
        <MendMap pins={pins} onLocationSelect={handlePointSelection} />
      </main>
    </div>
  );
}
export default App;
