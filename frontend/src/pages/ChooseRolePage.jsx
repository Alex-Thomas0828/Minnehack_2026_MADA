import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect } from "react";

export default function ChooseRolePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const droppedPin = location.state?.droppedPin;
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <h1 className="text-2xl font-bold mb-8 text-primary">What would you like to do?</h1>

      <Card className="bg-primary p-6 pb-2 space-y-4 w-86 flex flex-row gap-4">
        <Button
          onClick={() => navigate("/need-help", { state: { droppedPin } })}
          className="w-full bg-white text-mend-dark py-3 rounded-lg font-semibold shadow"
        >
          "I Need Help"
        </Button>

        <Button
          onClick={() => navigate("/i-can-help", { state: { droppedPin } })}
          className="w-full bg-white text-mend-dark py-3 rounded-lg font-semibold shadow"
        >
          "I Can Help"
        </Button>
      </Card>
      <p className=" text-sm text-gray-500 p-6">or press [esc] to return to map</p>
    </div>
  );
}
