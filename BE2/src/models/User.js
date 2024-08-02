import mongoose from "mongoose";
function validateEmail(textEmail) {
  return /^\S+@\S+\.\S+$/.test(textEmail);
}
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: validateEmail,
        message: "Khong dung dinh dang",
      },
    },
    password: {
      type: String,
      require: [true, "Khong duoc de trong"],
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
  },
  { timestamps: true }
);
export default mongoose.model("users", userSchema);
