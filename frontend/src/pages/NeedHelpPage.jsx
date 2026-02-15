import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { uploadImage } from "../lib/upload";

export default function NeedHelpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const droppedPin = location.state?.droppedPin;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen p-6 flex flex-col items-center bg-mend-light">
      <h1 className="text-xl font-bold mb-6">What needs mending?</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Item description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded h-24"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-mend-blue text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
