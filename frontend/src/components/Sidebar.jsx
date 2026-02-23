import { Menu, User, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser, getUserProfile } from "../lib/auth";
import PinModal from "./PinModal";
import Button from "./ui/button";

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

  function navButtonClass(panel) {
    const baseClass = "text-white border-transparent shadow-none transition-all duration-250 ease-out";
    if (activePanel === panel) {
      return `${baseClass} bg-mend-cyan shadow-inset scale-95`;
    }
    return `${baseClass} bg-transparent hover:bg-mend-cyan/45 hover:-translate-y-0.5 hover:shadow-raised active:translate-y-0 active:scale-95 active:shadow-inset`;
  }

  return (
    <div className="flex h-screen relative">
      {/* SIDEBAR NAVIGATION */}
      <div className="w-20 bg-mend-dark text-white flex flex-col items-center py-6 shrink-0 z-20">
        <div className="flex flex-col space-y-6 w-full items-center">
          <Button
            size="icon"
            shape="circle"
            variant="default"
            className={navButtonClass("profile")}
            onClick={() => togglePanel("profile")}
            aria-pressed={activePanel === "profile"}
          >
            <User />
          </Button>

          <Button
            size="icon"
            shape="circle"
            variant="default"
            className={navButtonClass("filter")}
            onClick={() => togglePanel("filter")}
            aria-pressed={activePanel === "filter"}
          >
            <Menu />
          </Button>

          <Button
            size="icon"
            shape="circle"
            variant="default"
            className={navButtonClass("info")}
            onClick={() => togglePanel("info")}
            aria-pressed={activePanel === "info"}
          >
            <Info />
          </Button>
        </div>
      </div>

      {/* EXPANDABLE CONTENT PANEL */}
      {activePanel && (
        <div className="w-72 bg-white text-black shadow-lg flex flex-col h-full shrink-0 z-10 border-r border-slate-200">
          {/* Profile Panel */}
          {activePanel === "profile" && (
            <div className="p-6">
              <h2 className="text-sm font-bold text-mend-dark uppercase tracking-wider mb-4">Profile</h2>
              <div className="space-y-3">
                <div className="border-b pb-2">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Name</p>
                  <p className="text-sm font-medium">{user?.name || "—"}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Email</p>
                  <p className="text-sm font-medium">{user?.email || "—"}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Phone</p>
                  <p className="text-sm font-medium">{user?.phone || "—"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Listings Panel */}
          {activePanel === "filter" && (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-sm font-bold text-mend-dark uppercase tracking-wider text-center mb-3">Listings</h2>
                <div className="flex justify-between text-[10px] uppercase font-bold">
                  <div className="flex gap-2">
                    <span className="text-emerald-600">{menderCount} Menders</span>
                    <span className="text-red-500">{demandCount} Requests</span>
                  </div>
                  <span className="text-slate-400">{pins.length} Total</span>
                </div>
              </div>

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
                  <div className="p-10 text-center">
                    <p className="text-xs text-slate-400 italic font-medium">No listings found in this area</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Info Panel */}
          {activePanel === "info" && (
            <div className="p-6">
              <h2 className="text-sm font-bold text-mend-dark uppercase tracking-wider mb-4">About MSP Mend</h2>
              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <p>Sometimes you need help. Sometimes you have the skills to help someone else.</p>
                <p>This platform connects people who need a service with local menders who can offer that service — safely and simply.</p>
                <p>Whether it’s sewing, electronics repair, or everyday tasks, you can find or offer help here.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}