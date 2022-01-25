import express, { Request, Response, NextFunction } from "express";

import * as productController from "../controllers/inventory_controller";

import { userRegistration, userLogin, logout } from "../config/login_reg_auth";
import upload from "../utils/multerImageUpload"
import {protectRoute} from "../utils/auth"

const router = express.Router();

/**
 * user register and login
 */
router.post("/register", userRegistration);
router.post("/login", userLogin);

router.get("/logout", logout);

//get all product
router.get("/allproduct", productController.allProduct);
//customerlist
router.get("/customerslist", productController.allusers);


//get product by id
router.get("/:id", productController.getProduct);

//get product by category
router.get("/category/:id", productController.getProductByCategory);

//update product
router.put("/:id",upload.single("product_photo_url"), productController.updateProduct);

//post new product

router.post("/addproduct", upload.single("product_photo_url"), productController.addProduct);

//delete product

router.delete("/:id", productController.deleteProduct);

/**
 * add to cart routes
 */

router.post("/addtocart", productController.addToCart);


// getCartByUserId
router.get("/user/allcart", productController.getAllCarts);

router.post("/sendemail", productController.sendEmail);

export default router;

