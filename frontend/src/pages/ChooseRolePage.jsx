import { useNavigate } from "react-router-dom";

export default function ChooseRolePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mend-light p-6">
      <h1 className="text-2xl font-bold mb-8">Hi User, what would you like to do?</h1>

      <div className="bg-mend-blue p-6 rounded-xl shadow-lg space-y-4 w-64">
        <button
          onClick={() => navigate("/need-help")}
          className="w-full bg-white text-mend-dark py-3 rounded-lg font-semibold shadow"
        >
          I Need Help
        </button>

        <button
          onClick={() => navigate("/i-can-help")}
          className="w-full bg-white text-mend-dark py-3 rounded-lg font-semibold shadow"
        >
          I Can Help
        </button>
      </div>
    </div>
  );
}
