import express from "express";
import connectDB from "./connectDB.js";
import cors from "cors";
import { userController } from "./user/userController.js";
import { dataController, saveDataAverage } from "./data/dataController.js";
import admin from "./firebaseAdmin.js"; // ⬅️ Imported from separate file

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
await connectDB();

// Routes
app.use(userController);
app.use(dataController);

// Firebase Realtime Database
const db = admin.database();

// Base route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Fetch sensor/control/status data from Firebase Realtime Database
app.get("/data", async (req, res) => {
  try {
    const snapshot = await db.ref("/").once("value");
    const value = snapshot.val();

    res.json({
      sensor: {
        temperature: value.sensor?.temperature ?? null,
        humidity: value.sensor?.humidity ?? null,
        moisture: value.sensor?.moisture ?? null,
      },
      control: {
        mode: value.control?.mode ?? "MANUAL",
        pump: value.control?.pump ?? "OFF",
      },
      status: {
        lastSeen: value.status?.lastSeen ?? 0,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Update control values in Firebase
app.post("/control", async (req, res) => {
  try {
    const { mode, pump } = req.body;
    if (mode) {
      await db.ref("control/mode").set(mode);
    }
    if (pump) {
      await db.ref("control/pump").set(pump);
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating control:", error);
    res.status(500).json({ error: "Failed to update control" });
  }
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Start averaging process
saveDataAverage();
setInterval(saveDataAverage, 60 * 60 * 1000);
