import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  dateOfData: {
    type: Date,
  },
  hourlyAverage: [
    {
      moisture: Number,
      humidity: Number,
      temperature: Number,
    },
  ],
  tempValue: [
    {
      moisture: Number,
      humidity: Number,
      temperature: Number,
    },
  ],
});

const DataTable = mongoose.model("data", dataSchema);

export default DataTable;
