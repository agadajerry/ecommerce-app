"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController = __importStar(require("../controllers/inventory_controller"));
const login_reg_auth_1 = require("../config/login_reg_auth");
const multerImageUpload_1 = __importDefault(require("../utils/multerImageUpload"));
const router = express_1.default.Router();
/**
 * user register and login
 */
router.post("/register", login_reg_auth_1.userRegistration);
router.post("/login", login_reg_auth_1.userLogin);
router.get("/logout", login_reg_auth_1.logout);
//get all product
router.get("/allproduct", productController.allProduct);
//customerlist
router.get("/customerslist", productController.allusers);
//get product by id
router.get("/:id", productController.getProduct);
//get product by category
router.get("/category/:id", productController.getProductByCategory);
//update product
router.put("/:id", multerImageUpload_1.default.single("product_photo_url"), productController.updateProduct);
//post new product
router.post("/addproduct", multerImageUpload_1.default.single("product_photo_url"), productController.addProduct);
//delete product
router.delete("/:id", productController.deleteProduct);
/**
 * add to cart routes
 */
router.post("/addtocart", productController.addToCart);
// getCartByUserId
router.get("/user/allcart", productController.getAllCarts);
router.post("/sendemail", productController.sendEmail);
exports.default = router;
