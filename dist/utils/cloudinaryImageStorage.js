"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinaryImage = require('cloudinary');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
try {
    cloudinaryImage.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
    });
}
catch (error) {
    console.error(error.message);
}
exports.default = cloudinaryImage;
