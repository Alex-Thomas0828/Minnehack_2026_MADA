import { useState } from 'react'
import viteLogo from '/vite.svg'

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
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </header>

      <main className="flex-1">
        <MendMap pins={pins} onLocationSelect={handlePointSelection} />
      </main>
    </div>
  );
}
export default App;
