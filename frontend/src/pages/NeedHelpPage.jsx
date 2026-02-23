import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { uploadImage } from "../lib/upload";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function NeedHelpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const droppedPin = location.state?.droppedPin;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      const image_url = await uploadImage(imageFile, user.id);

      const { lat, lng } = droppedPin || {};

      await supabase.from("Help").insert({
        auth_id: user.id,
        name,
        description,
        image_url,
        demander_id: Math.floor(Math.random() * 1000000000),
        location: droppedPin ? `POINT(${lng} ${lat})` : null
      });

      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-background">
      <h1 className="text-3xl font-bold mb-6 text-primary">What needs mending?</h1>

      <Card className="w-full max-w-md bg-background text-text-primary p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            placeholder="Item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-highlight bg-background p-3 rounded-md h-24 text-sm shadow-inset placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground"
            required
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="hidden"
          />

          <Button
            type="button"
            variant="default"
            onClick={() => fileInputRef.current?.click()}
            className="w-full text-muted-foreground"
          >
            {imageFile ? imageFile.name : "Choose Image"}
          </Button>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            className="w-full text-white bg-primary"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Card>
      <p className=" text-sm text-gray-500 p-6">press [esc] to cancel</p>
    </div>
  );
}
