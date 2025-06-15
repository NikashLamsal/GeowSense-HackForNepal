import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
});

const UserTable = mongoose.model("user", userSchema);

export default UserTable;
