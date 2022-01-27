"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const protectRoute = async (req, res, next) => {
    try {
        let token;
        token = req.cookies.jwt;
        if (!token) {
            return res.json({ unauthorised: "You are not authorised" });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel_1.default.findOne({ email: decodedToken.email });
        req.user = user;
        next();
    }
    catch (err) {
        res.json(err);
    }
};
exports.protectRoute = protectRoute;
