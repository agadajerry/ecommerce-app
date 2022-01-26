"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const url = "mongodb+srv://" + process.env.USERNAME + ":" + process.env.PASSWORD + "@cluster0.6wnbf.mongodb.net/ecommerceapp?retryWrites=true&w=majority";
const connect = async () => {
    await mongoose_1.default.connect(url);
    console.log("database is connected successfully...");
};
exports.default = connect;
