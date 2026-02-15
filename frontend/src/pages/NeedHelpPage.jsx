import { useState } from "react";
import { supabase } from "../lib/supabase";
import { uploadImage } from "../lib/upload";
import { useNavigate } from "react-router-dom";

export default function NeedHelpPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Get current user
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        console.error("No authenticated user");
        return;
      }

      // Upload image (if provided)
      const image_url = await uploadImage(imageFile, user.id);

      // Insert into Help table
      const { error } = await supabase.from("Help").insert({
        help_id: Math.floor(Math.random() * 1000000000), // random int
        demander_id: Math.floor(Math.random() * 1000000000), // random int
        name,
        description,
        image_url
      });

      if (error) {
        console.error("Insert error:", error);
        return;
      }

      // Navigate back to map
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

        <div>
          <label className="block text-sm font-medium mb-1">Image Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full"
          />
        </div>

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
