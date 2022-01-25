"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// const storage = multer.diskStorage({});
// let upload = multer({
//     storage
// })
const imageMulter = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let extn = path_1.default.extname(file.originalname);
        if (extn !== '.jpg' && extn !== '.jpeg' && extn !== '.png') {
            cb(new Error('File type is not supported...'), false);
            return;
        }
        cb(null, true);
    },
});
exports.default = imageMulter;
