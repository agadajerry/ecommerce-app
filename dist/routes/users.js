"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
/* GET home page. */
router.post("/register", userController_1.registerUser);
router.post("/login", userController_1.loginUser);
router.get("/logout", userController_1.logout);
exports.default = router;
