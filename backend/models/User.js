import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  course: {
    type: String,
  },
  college: {
    type: String,
  },
  passingYear: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
