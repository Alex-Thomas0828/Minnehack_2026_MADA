import { Menu, User, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser, getUserProfile } from "../lib/auth";
import PinModal from "./PinModal";

export default function Sidebar({ pins = [], onPinClick }) {
  const [activePanel, setActivePanel] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await getCurrentUser();
      if (!authUser) return;

      const profile = await getUserProfile(authUser.id);
      setUser(profile);
    };
    fetchUser();
  }, []);

  const demandCount = pins.filter((p) => p.is_demander).length;
  const menderCount = pins.filter((p) => !p.is_demander).length;

  function togglePanel(panel) {
    setActivePanel((prev) => (prev === panel ? null : panel));
  }

  return (
    <div className="flex h-full relative">
      {/* SIDEBAR ICONS */}
      <div className="w-14 bg-[var(--color-mend-dark)] text-white flex flex-col items-center py-6 shrink-0">
        <div className="flex flex-col space-y-6 w-full items-center">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-800"
            onClick={() => togglePanel("profile")}
          >
            <User size={20} />
          </button>

          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-800"
            onClick={() => togglePanel("filter")}
          >
            <Menu size={20} />
          </button>

          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-800"
            onClick={() => togglePanel("info")}
          >
            <Info size={20} />
          </button>
        </div>
      </div>

      {/* EXPANDABLE PANEL */}
      {activePanel && (
        <div className="w-72 bg-white text-black shadow-lg flex flex-col h-full shrink-0">
          {/* Profile Panel */}
          {activePanel === "profile" && (
            <div className="p-6">
              <h2 className="text-sm font-bold text-mend-dark uppercase tracking-wider mb-4">
                Profile
              </h2>
              <div className="space-y-2">
                <p className="text-xs text-slate-600">
                  Name: <span className="font-medium">{user?.name || "—"}</span>
                </p>
                <p className="text-xs text-slate-600">
                  Phone:{" "}
                  <span className="font-medium">{user?.phone || "—"}</span>
                </p>
                <p className="text-xs text-slate-600">
                  Email:{" "}
                  <span className="font-medium">{user?.email || "—"}</span>
                </p>
              </div>
            </div>
          )}

          {/* Filter / Listings Panel */}
          {activePanel === "filter" && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-slate-200">
                <h2 className="text-sm font-bold text-mend-dark uppercase tracking-wider text-center mb-3">
                  Listings
                </h2>

                {/* Counts */}
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{pins.length} Total</span>
                  <div className="flex gap-3">
                    <span className="text-emerald-600 font-medium">
                      {menderCount} Menders
                    </span>
                    <span className="text-red-500 font-medium">
                      {demandCount} Requests
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrollable pin list */}
              <div className="flex-1 overflow-y-auto">
                {pins.length > 0 ? (
                  pins.map((pin, i) => (
                    <PinModal
                      key={pin.help_id || pin.service_id || i}
                      pin={pin}
                      onClick={onPinClick}
                    />
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-xs text-slate-400 italic">
                      No listings yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Info Panel */}
          {activePanel === "info" && (
            <div className="p-6">
              <h2 className="text-sm font-bold text-mend-dark uppercase tracking-wider mb-4">
                About
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Life gets busy. Sometimes you need help. Sometimes you have the
                skills to help someone else.
              </p>
              <br />
              <p className="text-xs text-slate-600 leading-relaxed">
                This platform connects people who need a service with people who
                can offer that service — safely and simply.
              </p>
              <br />
              <p className="text-xs text-slate-600 leading-relaxed">
                Whether it's tutoring, moving help, design work, tech support,
                or everyday tasks, you can find or offer help here.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
