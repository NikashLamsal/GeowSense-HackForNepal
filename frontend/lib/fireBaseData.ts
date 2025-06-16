// lib/fireBaseConfig.ts (client-side)
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCIv249TsVxNXuoZB9E_aPJwDK5l9ZjH6Y",
  authDomain: "growsense-51fc4.firebaseapp.com",
  databaseURL: "https://growsense-51fc4-default-rtdb.firebaseio.com",
  projectId: "growsense-51fc4",
  storageBucket: "growsense-51fc4.firebasestorage.app",
  messagingSenderId: "487944765853",
  appId: "1:487944765853:web:5e0bb997d86b292e45af74",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const database = getDatabase(app);

export { database };