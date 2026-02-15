const categoryColors = {
  "Physical Hardware": "bg-slate-500",
  "Art & Decor": "bg-purple-500",
  "Textiles/Clothing": "bg-orange-500",
  Electronics: "bg-yellow-500",
  Other: "bg-gray-400",
};

export default function PinModal({ pin, onClick }) {
  const isSupplier = !pin.is_demander;
  const catColor = categoryColors[pin.category] || categoryColors["Other"];

  const dateStr = pin.created_at
    ? new Date(pin.created_at).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "";

  return (
    <button
      onClick={() => onClick(pin)}
      className="w-full text-left border-b border-slate-200 p-5 hover:bg-slate-50 transition-colors"
    >
      {/* Top row: badge + date */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-tighter ${
            isSupplier
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isSupplier ? "Mender" : "Request"}
        </span>
        {dateStr && <span className="text-xs text-slate-400">{dateStr}</span>}
      </div>
      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          {/* Name */}
          <p className="text-base font-bold text-mend-dark truncate">
            {pin.name}
          </p>

          {/* Category tag */}
          {pin.category && (
            <span
              className={`inline-block mt-2 px-2 py-0.5 rounded text-white text-[10px] font-bold ${catColor}`}
            >
              {pin.category}
            </span>
          )}

          {/* Description preview */}
          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {pin.description}
          </p>
        </div>

        {/* Thumbnail */}
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-200 shrink-0">
          {pin.image_url ? (
            <img
              src={pin.image_url}
              alt={pin.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-mend-blue/10">
              <span className="text-[10px] text-slate-400">No img</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
