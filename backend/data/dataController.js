import express from "express";
import DataTable from "./dataSchema.js";
import getDataFromFirebase from "./getDataFromFireBase.js";

const router = express.Router();

export const saveDataAverage = async () => {
  let sampleCount = 0;
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const data = await getDataFromFirebase();

    let doc = await DataTable.findOne({ dateOfData: startOfToday });

    if (!doc) {
      doc = new DataTable({
        dateOfData: startOfToday,
        tempValue: [{ moisture: 0, temperature: 0, humidity: 0 }],
        hourlyAverage: [],
      });
      sampleCount = 0;
    }

    let temp = doc.tempValue[0] || { moisture: 0, temperature: 0, humidity: 0 };

    temp.moisture += data.moisture;
    temp.temperature += data.temperature;
    temp.humidity += data.humidity;

    doc.tempValue[0] = temp;
    sampleCount++;

    if (sampleCount === 12) {
      const avgMoisture = temp.moisture / 12;
      const avgTemperature = temp.temperature / 12;
      const avgHumidity = temp.humidity / 12;

      doc.hourlyAverage.push({
        moisture: avgMoisture,
        temperature: avgTemperature,
        humidity: avgHumidity,
      });

      doc.tempValue[0] = { moisture: 0, temperature: 0, humidity: 0 };
      sampleCount = 0;

      console.log(
        `Saved hourly average for ${startOfToday.toDateString()}. Total hours: ${
          doc.hourlyAverage.length
        }`
      );
    }

    await doc.save();
  } catch (error) {
    console.error("Error in saveDataAverage:", error);
  }
};

router.post("/data/get", async (req, res) => {
  const data = await getDataFromFirebase();

  if (!data) {
    return res.status(200).send({ message: "Data Doesn't Exist" });
  }
  return res.status(200).send({ message: "Data Sent Successfully" }, data);
});
