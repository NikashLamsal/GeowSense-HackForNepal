import express from "express";
import connectDB from "./connectDB.js";
import cors from "cors";
import { userController } from "./user/userController.js";

const app = express();
app.use(express.json());
app.use(cors());

await connectDB();

app.use(userController);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
