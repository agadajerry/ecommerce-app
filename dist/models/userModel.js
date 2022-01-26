"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const User = mongoose_1.default.model("newusers", exports.userSchema);
exports.default = User;
