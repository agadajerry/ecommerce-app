"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.loginUser = exports.registerUser = void 0;
const utils_1 = require("../utils/utils");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function registerUser(req, res, next) {
    const { fullname, email, phoneNumber, address, password, repeat_password, } = req.body;
    try {
        // Validating with joi
        const { error } = (0, utils_1.validateUser)(req.body);
        // console.log(error)
        if (error) {
            res.json("error occur in registerisation validation");
        }
        else {
            const user = await userModel_1.default.create({
                fullname,
                email,
                phoneNumber,
                address,
                password
            });
            const token = (0, utils_1.createToken)(user._id);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000,
            });
            res.json("Register successful");
        }
    }
    catch (error) {
        const errors = (0, utils_1.handleErrors)(error);
        console.log(errors);
        res.json({ registerError: "errors" });
    }
}
exports.registerUser = registerUser;
async function loginUser(req, res) {
    const { email, password } = req.body;
    //(1) if email and password exist
    if (!email || !password) {
        res.json({ message: "please provide email and password" });
        return;
    }
    //(2) check if user exist && passwod is correct
    const userDetails = await userModel_1.default.findOne({ email }).select("+password");
    const decrypPass = bcryptjs_1.default.compare(password, userDetails.password);
    if (!decrypPass) {
        res.json({ message: "Incorrect Email or password" });
        return;
    }
    else {
        //(3) if everything is ok,send the token to the client
        const token = (0, utils_1.createToken)(email._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        res.json("shopping page");
    }
}
exports.loginUser = loginUser;
async function logout(req, res) {
    res.clearCookie("jwt");
    res.json("login page after logout");
}
exports.logout = logout;
