import { useState } from "react";

export default function MenderPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [imageFile, setImageFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, description, website, imageFile });
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-mend-light">
      <h1 className="text-xl font-bold mb-6">How can you help?</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Your name or business name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Describe your skills or services"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded h-24"
        />

        <input
          type="url"
          placeholder="Website link (optional)"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full border p-2 rounded"
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
          className="w-full bg-mend-blue text-white py-3 rounded-lg font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
