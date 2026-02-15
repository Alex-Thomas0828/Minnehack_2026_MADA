import React from "react";


export default function MendDetails({ pin, onClose }) {
  if (!pin) return null;

  const isSupplier = !pin.is_demander;

  const categoryColors = {
    "Physical Hardware": "bg-slate-500",
    "Art & Decor": "bg-purple-500",
    "Textiles/Clothing": "bg-orange-500",
    Electronics: "bg-yellow-500",
    Other: "bg-gray-400",
  };

  const catColor = categoryColors[pin.category] || categoryColors["Other"];

  return (
    <div className="absolute top-4 right-4 z-[1001] w-80 md:w-96 bg-white rounded-2xl shadow-2xl border-2 border-mend-dark overflow-hidden transition-all">
      {/* Header Image */}
      <div className="h-40 bg-slate-200 relative">
        {/* Image fetch goes here once Supabase storage bucket is set up */}
        <div className="w-full h-full flex items-center justify-center bg-mend-blue/10 text-mend-blue">
          <span className="text-sm text-slate-400 font-medium">
            Image placeholder
          </span>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black/50 text-white w-8 h-8 rounded-full hover:bg-mend-dark transition"
        >
          X
        </button>
      </div>

      <div className="p-6">
        {/* Title & Badge */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-mend-dark leading-tight">
            {pin.name}
          </h2>
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter ${
              isSupplier
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isSupplier ? "Mender" : "Request"}
          </span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-slate-300" />
          <p className="text-xs font-medium text-slate-500">
            Posted by{" "}
            <span className="text-mend-blue">
              {pin.user_name || "Community Member"}
            </span>
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pin.category && (
            <span
              className={`px-2 py-1 rounded-full text-white text-[10px] font-bold flex items-center gap-1.5 ${catColor}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
              {pin.category}
            </span>
          )}
        </div>

        {/* Date Posted */}
        <div className="mb-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">
            Date Posted
          </h4>
          <p className="text-xs text-slate-600">
            {pin.created_at
              ? new Date(pin.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Unknown"}
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">
            Description
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed italic">
            &ldquo;{pin.description}&rdquo;
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-2">
            Contact Info
          </h4>
          <div className="space-y-2">
            {pin.email && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">
                  Email:
                </span>
                <a
                  href={`mailto:${pin.email}`}
                  className="text-xs text-mend-blue hover:underline"
                >
                  {pin.email}
                </a>
              </div>
            )}
            {pin.phone && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">
                  Phone:
                </span>
                <a
                  href={`tel:${pin.phone}`}
                  className="text-xs text-mend-blue hover:underline"
                >
                  {pin.phone}
                </a>
              </div>
            )}
            {!pin.email && !pin.phone && (
              <p className="text-xs text-slate-400 italic">
                No contact info provided
              </p>
            )}
          </div>
        </div>

        {/* Contact/Action Button */}
        <button
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
            isSupplier
              ? "bg-mend-dark text-white hover:bg-mend-blue"
              : "bg-mend-cyan text-mend-dark hover:bg-mend-blue hover:text-white"
          }`}
        >
          {isSupplier ? "Contact for Repair" : "Offer to Mend This"}
        </button>
      </div>
    </div>
  );
}
