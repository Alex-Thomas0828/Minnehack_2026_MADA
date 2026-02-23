import React from "react";
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { X } from "lucide-react";

const categoryColors = {
  "Physical Hardware": "bg-slate-500",
  "Art & Decor": "bg-purple-500",
  "Textiles/Clothing": "bg-orange-500",
  Electronics: "bg-yellow-500",
  Other: "bg-gray-400",
};

export default function MendDetails({ pin, onClose }) {
  if (!pin) return null;

  const isSupplier = !pin.is_demander;
  const catColor = categoryColors[pin.category] || categoryColors["Other"];
  const socials = pin.socials || {};
  const socialEntries = Object.entries(socials).filter(([, val]) => val);

  return (
    <Card
      variant="raised"
      className="absolute top-4 right-4 z-1001 w-80 md:w-96 bg-background overflow-hidden transition-all max-h-[calc(100%-2rem)] flex flex-col"
    >
      <div className="h-40 bg-muted relative shrink-0 shadow-inset">
        {pin.image_url ? (
          <img
            src={pin.image_url}
            alt={pin.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <span className="text-sm text-muted-foreground font-medium">No image</span>
          </div>
        )}
        <Button
          size="icon"
          shape="circle"
          variant="default"
          onClick={onClose}
          className="absolute top-2 right-2 bg-black/70 text-white border-transparent hover:bg-black/90 shadow-raised"
        >
          <X size={16} />
        </Button>
      </div>

      <div className="p-6 overflow-y-auto flex-1">
        {/* Title & Badge */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-primary leading-tight">
            {pin.name}
          </h2>
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter shrink-0 shadow-sm ${isSupplier
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
              }`}
          >
            {isSupplier ? "Mender" : "Request"}
          </span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-muted shadow-inset shrink-0 border border-border" />
          <p className="text-xs font-medium text-muted-foreground">
            Posted by{" "}
            <span className="text-primary font-semibold">
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
          <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-1">
            Date Posted
          </h4>
          <p className="text-xs text-muted-foreground font-medium">
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
        <div className="mb-4">
          <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-1">
            Description
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            &ldquo;{pin.description}&rdquo;
          </p>
        </div>
        {/*Contact Information */}
        <div className="mb-4">
          <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-2">
            Contact Info
          </h4>
          <div className="space-y-2">
            {pin.email && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Email:
                </span>
                <a
                  href={`mailto:${pin.email}`}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  {pin.email}
                </a>
              </div>
            )}
            {pin.phone && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Phone:
                </span>
                <a
                  href={`tel:${pin.phone}`}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  {pin.phone}
                </a>
              </div>
            )}
            {!pin.email && !pin.phone && (
              <p className="text-xs text-muted-foreground italic">
                No contact info provided
              </p>
            )}
          </div>
        </div>

        {/*Business Website for suppliers only */}
        {isSupplier && (
          <div className="mb-4">
            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-2">
              Business
            </h4>
            {pin.website ? (
              <a
                href={pin.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary underline hover:no-underline break-all font-medium"
              >
                {pin.website}
              </a>
            ) : (
              <p className="text-xs text-muted-foreground italic">No website listed</p>
            )}
          </div>
        )}

        {/* Socials */}
        <div className="mb-6">
          <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-2">
            Socials
          </h4>
          {socialEntries.length > 0 ? (
            <div className="space-y-2">
              {socialEntries.map(([platform, handle]) => (
                <div key={platform} className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground capitalize">
                    {platform}:
                  </span>
                  <span className="text-xs text-primary font-medium">{handle}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">No socials listed</p>
          )}
        </div>

        {/*Contact/Action Button */}
        <Button
          variant="primary"
          className="w-full text-white bg-primary"
        >
          {isSupplier ? "Contact for Repair" : "Offer to Mend This"}
        </Button>
      </div>
    </Card>
  );
}
