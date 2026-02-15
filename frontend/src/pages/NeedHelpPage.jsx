import { useState } from "react";

export default function NeedHelpPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, description, imageFile });
    // Later: upload image + insert into Help table
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
        />

        <textarea
          placeholder="Item description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded h-24"
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
