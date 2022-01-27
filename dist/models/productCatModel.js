"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb_1 = __importDefault(require("../config/connectDb"));
//db connection
(0, connectDb_1.default)();
//product category and model
const brand_category = new mongoose_1.default.Schema({
    product_brand: { type: String },
    product_category: { type: String },
    date_inserted: { type: Date, default: new Date() }
});
const brand = mongoose_1.default.model("product_brand_category", brand_category);
exports.default = brand;
