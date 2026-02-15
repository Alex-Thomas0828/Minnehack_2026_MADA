import { useState } from "react";

export default function MapKey() {
  const [isExpanded, setIsExpanded] = useState(true);

  const categories = [
    { label: "Physical Hardware", color: "bg-slate-500" },
    { label: "Art & Decor", color: "bg-purple-500" },
    { label: "Textiles/Clothing", color: "bg-orange-500" },
    { label: "Electronics", color: "bg-yellow-500" },
    { label: "Other", color: "bg-gray-400" },
  ];

  return (
    <div className="absolute bottom-10 right-6 z-[1000] pointer-events-none transition-all duration-300">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-mend-dark overflow-hidden transition-all w-56 pointer-events-auto">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-mend-dark p-3 flex items-center justify-between text-white hover:bg-mend-blue transition-colors"
        >
          <span className="font-bold text-xs tracking-widest uppercase truncate">
            Mend Guide
          </span>
          <span className="text-lg font-bold">
            {isExpanded ? "\u25B2" : "\u25BC"}
          </span>
        </button>

        <div className={`p-4 space-y-4 ${isExpanded ? "block" : "hidden"}`}>
          {/* Role Section */}
          <section className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              Roles
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
                className="h-5"
                alt="Mender"
              />
              <span className="text-xs font-medium text-slate-700">
                Mender (Supplier)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full border-2 border-red-500 bg-red-500/20" />
              <span className="text-xs font-medium text-slate-700">
                Request (Demander)
              </span>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Categories Section */}
          <section className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              Specialties
            </p>
            {categories.map((cat) => (
              <div key={cat.label} className="flex items-center gap-3 group">
                <div className={`h-3 w-3 rounded-full ${cat.color}`} />
                <span className="text-xs text-slate-600">{cat.label}</span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}