import express from "express";
import DataTable from "./dataSchema.js";
import getDataFromFirebase from "./getDataFromFireBase.js";

const router = express.Router();

export const saveDataAverage = async () => {
  try {
    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const data = await getDataFromFirebase();
    console.log("Data from web:", data);

    // Find today's document or create a new one if none exists or sampleCount reached 24
    let doc = await DataTable.findOne({ dateOfData: startOfToday });

    if (!doc || doc.sampleCount >= 24) {
      doc = new DataTable({ dateOfData: startOfToday });
      doc.sampleCount = 0;
      doc.moistureValues = new Array(25).fill(0);
      doc.temperatureValues = new Array(25).fill(0);
      doc.humidityValues = new Array(25).fill(0);
      console.log("New document created for the day.");
    }
    

    const index = doc.sampleCount;

    // Save data at the current sampleCount index
    doc.moistureValues[index] = data.moisture;
    doc.temperatureValues[index] = data.temperature;
    doc.humidityValues[index] = data.humidity;

    doc.sampleCount += 1;

    console.log(
      `Index ${index}: Moisture=${data.moisture}, Temp=${data.temperature}, Humidity=${data.humidity}`
    );
    console.log(`Sample count incremented to ${doc.sampleCount}`);

    await doc.save();
  } catch (err) {
    console.error("Error in saveDataAverage:", err);
  }
};

router.get("/data/get", async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const doc = await DataTable.findOne({ dateOfData: startOfToday });

    if (!doc) {
      return res.status(200).send({ message: "Data Doesn't Exist" });
    }

    return res
      .status(200)
      .json({ message: "Data Sent Successfully", data: doc });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

export { router as dataController };
