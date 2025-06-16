import {
  initializeApp,
  getApps,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { Database } from "firebase-admin/lib/database/database";
import serviceAccountKey from "./serviceAccountKey.json";
import type { DataSnapshot, Reference } from "firebase-admin/database";

const app = !getApps().length
  ? initializeApp({
      credential: cert(serviceAccountKey as ServiceAccount),
      databaseURL:
        "https://growsense-51fc4-default-rtdb.asia-southeast1.firebasedatabase.app",
    })
  : getApps()[0];

const db: Database = getDatabase(app);

export interface ControlData {
  mode: string;
  pump: string;
}

export interface SensorData {
  moisture: number;
  temperature: number;
  humidity: number;
}

export interface StatusData {
  lastSeen: number;
}

export interface FirebaseData {
  control: ControlData;
  sensor: SensorData;
  status: StatusData;
}

const getFirebaseData = async (): Promise<FirebaseData | null> => {
  try {
    const ref: Reference = db.ref("/");
    const snapshot: DataSnapshot = await ref.once("value");
    const data = snapshot.val();

    if (!data) {
      throw new Error("No data found in Firebase");
    }

    return {
      control: {
        mode: data.control?.mode,
        pump: data.control?.pump,
      },
      sensor: {
        moisture: data.sensor?.moisture,
        temperature: data.sensor?.temperature,
        humidity: data.sensor?.humidity,
      },
      status: {
        lastSeen: data.status?.lastSeen,
      },
    };
  } catch (error: any) {
    console.error("Error fetching data from Firebase:", error.message);
    return null;
  }
};

export default getFirebaseData;
