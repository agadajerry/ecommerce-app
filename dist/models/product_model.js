"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inv_schema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.inv_schema = new mongoose_1.default.Schema({
    product_name: { type: String },
    product_price: { type: Number, required: true },
    product_qtty: { type: String, required: true },
    product_size: { type: String },
    product_category: { type: String },
    product_photo_url: { type: String },
    cloudinary_id: { type: String },
    date_inserted: { type: Date, default: new Date() },
    description: { type: String }
});
const product = mongoose_1.default.model("newproducts", exports.inv_schema);
exports.default = product;
