import { Card } from "@/components/ui/card";

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
    <Card
      variant="raised"
      onClick={() => onClick(pin)}
      className="w-full text-left m-3 p-4 cursor-pointer hover:shadow-inset hover:scale-98 active:shadow-inset active:scale-97 transition-all duration-250 bg-background"
    >
      {/* Top row: badge + date */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-sm ${isSupplier
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
            }`}
        >
          {isSupplier ? "Mender" : "Request"}
        </span>
        {dateStr && <span className="text-xs text-muted-foreground font-medium">{dateStr}</span>}
      </div>
      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          {/* Name */}
          <p className="text-base font-bold text-primary truncate">
            {pin.name}
          </p>

          {/* Category tag */}
          {pin.category && (
            <span
              className={`inline-block mt-2 px-2.5 py-1 rounded-full text-white text-[10px] font-bold shadow-sm ${catColor}`}
            >
              {pin.category}
            </span>
          )}

          {/* Description preview */}
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
            {pin.description}
          </p>
        </div>

        {/* Thumbnail */}
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted shadow-inset shrink-0 border-2 border-border">
          {pin.image_url ? (
            <img
              src={pin.image_url}
              alt={pin.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <span className="text-[10px] text-muted-foreground font-medium">No img</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
