import { createRequire } from "module";
import admin from "firebase-admin";

const require = createRequire(import.meta.url);
const serviceAccount = require("../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://growsense-51fc4-default-rtdb.asia-southeast1.firebasedatabase.app",
  });
}

const db = admin.database();

const getDataFromFirebase = async () => {
  try {
    const snapshot = await db.ref("sensor").once("value");
    const data = snapshot.val();

    if (!data) throw new Error("No data found in Firebase");

    return {
      moisture: data.moisture || 0,
      temperature: data.temperature || 0,
      humidity: data.humidity || 0,
    };
  } catch (error) {
    console.error("Error fetching data from Firebase:", error.message);
    return {
      moisture: 0,
      temperature: 0,
      humidity: 0,
    };
  }
};

export default getDataFromFirebase;
