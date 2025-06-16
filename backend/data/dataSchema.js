import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  dateOfData: {
    type: Date,
    required: true,
  },
  sampleCount: {
    type: Number,
    default: 0,
  },
  moistureValues: {
    type: [Number],
    default: () => new Array(25).fill(0),
    required: true,
  },
  temperatureValues: {
    type: [Number],
    default: () => new Array(25).fill(0),
    required: true,
  },
  humidityValues: {
    type: [Number],
    default: () => new Array(25).fill(0),
    required: true,
  },
});

const DataTable = mongoose.model("data", dataSchema);

export default DataTable;
