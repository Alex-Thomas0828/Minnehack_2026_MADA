import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import supabase from "./supabaseClient.js";

import userRoutes from "./routes/users.js";
import helpRoutes from "./routes/help.js";
import serviceRoutes from "./routes/service.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

app.get("/health", async (req, res) => {
    const { error } = await supabase
      .from("Users")
      .select("id")
      .limit(1);
  
    if (error) {
      console.error(error);
      return res.status(500).json({ status: "database unhealthy" });
    }
  
    res.json({ status: "database healthy" });
  });
  
app.use("/api/users", userRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/service", helpRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

