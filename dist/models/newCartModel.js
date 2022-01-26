"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//cart model
const CartSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "newusers",
    },
    products: Array,
    active: {
        type: Boolean,
        default: true,
    },
    modifiedOn: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const cart = mongoose_1.default.model("productcart", CartSchema);
exports.default = cart;
