import mongoose from "mongoose";

export interface IUser {
  fullname: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
}

export const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Name field is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      maxlength: [15, "phone number length must be 11 characters"],
    },
    address: {
      type: String,
      lowercase: true,
    },
   
    password: {
      type: String,
      required: [true, "password is reqiured"],
      minlength: [8, "minimum password length is 8 characters"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("newusers", userSchema);
export default User;
