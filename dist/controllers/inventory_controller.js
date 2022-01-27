"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.getAllCarts = exports.addToCart = exports.allusers = exports.deleteProduct = exports.updateProduct = exports.getProductByCategory = exports.getProduct = exports.allProduct = exports.addProduct = void 0;
const express_1 = __importDefault(require("express"));
const product_model_1 = __importDefault(require("../models/product_model"));
const userModel_1 = __importDefault(require("../models/userModel"));
const newCartModel_1 = __importDefault(require("../models/newCartModel"));
const cloudinaryImageStorage_1 = __importDefault(require("../utils/cloudinaryImageStorage"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_mailgun_transport_1 = __importDefault(require("nodemailer-mailgun-transport"));
let router = express_1.default.Router();
let addProduct = async (req, res) => {
    try {
        let cloudImage = await cloudinaryImageStorage_1.default.uploader.upload(req.file.path);
        let product = new product_model_1.default({
            product_qtty: req.body.product_qtty,
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_size: req.body.product_size,
            description: req.body.description,
            product_photo_url: cloudImage.secure_url,
            cloudinary_id: cloudImage.public_id,
        });
        product.save((err) => {
            if (err) {
                return res.json(err);
            }
            res.json(product);
        });
    }
    catch (err) {
        res.json({ msg: err.message });
    }
};
exports.addProduct = addProduct;
//Get all products
let allProduct = (req, res) => {
    product_model_1.default.find((err, products) => {
        if (err) {
            return res.send(err);
        }
        res.json(products);
    });
};
exports.allProduct = allProduct;
//find by id
let getProduct = (req, res) => {
    product_model_1.default.findById(req.params.id, (err, product) => {
        if (err) {
            return res.send(err);
        }
        //  console.log(res.json(product))
        res.json(product);
    });
};
exports.getProduct = getProduct;
//get product by category
let getProductByCategory = (req, res) => {
    product_model_1.default.find()
        .where("product_category", req.params.id)
        .exec((err, product) => {
        if (err) {
            return res.send(err);
        }
        //  console.log(res.json(product))
        res.json(product);
    });
};
exports.getProductByCategory = getProductByCategory;
//update product
let updateProduct = async (req, res) => {
    try {
        let product = await product_model_1.default.findById(req.params.id);
        await cloudinaryImageStorage_1.default.uploader.destroy(product.cloudinary_id);
        let cloudImage = await cloudinaryImageStorage_1.default.uploader.upload(req.file.path);
        const data = {
            product_name: req.body.product_name || product.product_name,
            product_photo_url: cloudImage.secure_url || product.product_photo_url,
            product_size: req.body.product_size || product.product_size,
            product_qtty: req.body.product_qtty || product.product_qtty,
            description: req.body.description || product.description,
            product_price: req.body.product_price || product.product_price,
            cloudinary_id: cloudImage.public_id || product.cloudinary_id
        };
        product = await product_model_1.default.findByIdAndUpdate(req.params.id, data, { new: true });
        return res.json(product);
    }
    catch (err) {
        console.error(err);
    }
};
exports.updateProduct = updateProduct;
//delete book
let deleteProduct = (req, res) => {
    try {
        product_model_1.default.findById({ _id: req.params.id }, async (err, product) => {
            if (err)
                return res.json({ msg: "No Product found to delete error.." });
            await cloudinaryImageStorage_1.default.uploader.destroy(product.cloudinary_id);
            await product.remove();
        });
    }
    catch (err) {
        console.log(err.message);
    }
};
exports.deleteProduct = deleteProduct;
//
/**
 * acessing users collection
 */
let allusers = (req, res) => {
    userModel_1.default.find(function (err, userlist) {
        if (err) {
            res.json(err);
        }
        res.json({ userlists: userlist });
    });
};
exports.allusers = allusers;
/**
 * new cart function created which does
 * not use session but save directly to db
 *
 */
const addToCart = async (req, res) => {
    try {
        // Save what is coming from the request body to db
        const newCart = new newCartModel_1.default({
            userId: req.body.userId,
            products: [...req.body.products],
        });
        newCart.save();
        if (newCart) {
            return res.send("New Cart saved successfully...");
        }
        else {
            return res.status(404).json({ msg: "Something went wrong..." });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong");
    }
};
exports.addToCart = addToCart;
//get get all cart items according to the user request
const getAllCarts = async (req, res) => {
    let userCartItem = await newCartModel_1.default.find({}).populate("userId");
    if (userCartItem)
        return res.json(userCartItem);
};
exports.getAllCarts = getAllCarts;
// send email to me from my contact
const sendEmail = (req, res) => {
    const auth = {
        auth: {
            api_key: '49b85a72e4731abb55598fceb851908c-054ba6b6-6aab6ad0',
            domain: 'sandboxe8970bf5967845e497db0af64f4cf651.mailgun.org'
        }
    };
    const transporter = nodemailer_1.default.createTransport((0, nodemailer_mailgun_transport_1.default)(auth));
    let mailOptions = {
        from: req.body.fromEmail,
        to: "idokoidoko4@gmail.com",
        subject: req.body.subject,
        text: req.body.message
    };
    //send mail
    transporter.sendMail(mailOptions, (err, data) => {
        if (err)
            return res.status(404).json({ msg: err });
        res.status(200).json({ msg: "Message sent..." });
    });
};
exports.sendEmail = sendEmail;
