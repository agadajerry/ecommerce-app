"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const secret = process.env.JWT_SECRET;
async function auth(req, res, next) {
    try {
        // console.log(req.cookies);
        const token = req.cookies.jwt;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log(decoded);
        const user = await userModel_1.default.find({ _id: decoded.id });
        if (!user) {
            res.redirect("/");
            return;
        }
        req.user = user;
        next();
    }
    catch (e) {
        // res.status(401).send({ error: 'Please authenticate.' })
        res.redirect("/");
    }
}
exports.auth = auth;
