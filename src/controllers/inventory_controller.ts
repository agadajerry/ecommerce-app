import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Products from "../models/product_model";
import User from "../models/userModel"
import CartItem from "../models/newCartModel";
import cloudinaryImage from "../utils/cloudinaryImageStorage";

import nodemailer from "nodemailer"
import mailgun  from "nodemailer-mailgun-transport"

let router = express.Router();

export let addProduct = async (req: any, res: Response) => {
  try {
    let cloudImage = await cloudinaryImage.uploader.upload(req.file.path);

    let product = new Products({
      product_qtty: req.body.product_qtty,
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_size: req.body.product_size,
      description: req.body.description,
      product_photo_url: cloudImage.secure_url,
      cloudinary_id: cloudImage.public_id,
    });

    product.save((err: any) => {
      if (err) {
        return res.json(err);
      }
      res.json(product);
    });
  } catch (err: any) {
    res.json({ msg: err.message });
  }
};

//Get all products

export let allProduct = (req: Request, res: Response) => {
  Products.find((err: any, products: any) => {
    if (err) {
      return res.send(err);
    }

    res.json(products);
  });
};

//find by id

export let getProduct = (req: Request, res: Response) => {
  Products.findById(req.params.id, (err: any, product: any) => {
    if (err) {
      return res.send(err);
    }
    //  console.log(res.json(product))
    res.json(product);
  });
};

//get product by category

export let getProductByCategory = (req: Request, res: Response) => {
  Products.find()
    .where("product_category", req.params.id)
    .exec((err: any, product: any) => {
      if (err) {
        return res.send(err);
      }
      //  console.log(res.json(product))
      res.json(product);
    });
};

//update product

export let updateProduct = async (req: any, res: Response) => {

  try{
  let product  = await Products.findById(req.params.id);

  await cloudinaryImage.uploader.destroy(product.cloudinary_id);

  let cloudImage = await cloudinaryImage.uploader.upload(req.file.path);

  const data  = {
      product_name:req.body.product_name || product.product_name,
      product_photo_url:cloudImage.secure_url || product.product_photo_url,
      product_size:req.body.product_size || product.product_size,
      product_qtty: req.body.product_qtty || product.product_qtty,
      description: req.body.description || product.description,
      product_price: req.body.product_price || product.product_price,
      cloudinary_id: cloudImage.public_id ||  product.cloudinary_id
      }

      product =  await Products.findByIdAndUpdate(req.params.id, data, {new:true});

     return res.json(product);

  }catch(err:any){
    console.error(err)
  }

};

//delete book

export let deleteProduct = (req: Request, res: Response) => {
  try {
    Products.findById(
      { _id: req.params.id },
      async (err: any, product: any) => {
        if (err) return res.json({ msg: "No Product found to delete error.." });

        await cloudinaryImage.uploader.destroy(product.cloudinary_id);
        await product.remove();
      }
    );
  } catch (err: any) {
    console.log(err.message);
  }
};

//

/**
 * acessing users collection
 */




export let allusers = (req: Request, res: Response) => {
  User.find(function (err: any, userlist: any) {
    if (err) {
      res.json(err);
    }
    res.json( { userlists: userlist });
})
}


/**
 * new cart function created which does
 * not use session but save directly to db
 *
 */

export const addToCart = async (req: Request, res: Response) => {
  try {
    // Save what is coming from the request body to db

    const newCart = new CartItem({
      userId: req.body.userId,
      products: [...req.body.products],
    });
    newCart.save();
    if (newCart) {
      return res.send("New Cart saved successfully...");
    } else {
      return res.status(404).json({ msg: "Something went wrong..." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
};

//get get all cart items according to the user request


export const getAllCarts = async (req: Request, res: Response) => {


 let userCartItem =  await CartItem.find({}).populate("userId");

 if(userCartItem) return res.json(userCartItem);
 
};



// send email to me from my contact

export const sendEmail = (req:Request, res: Response)=>{


 const  auth = {
   
    auth:{
     api_key:process.env.MAILGUN_KEY as string,
      domain:process.env.MAILGUN_DOMAIN as string
    }
  };

  const transporter = nodemailer.createTransport(mailgun(auth))
  

  let mailOptions = {
    from:  req.body.fromEmail,
    to: "idokoidoko4@gmail.com",
    subject:req.body.subject,
    text: req.body.message
  }

  
  //send mail

  transporter.sendMail(mailOptions,(err:any, data:any)=>{

    if(err) return res.status(404).json({msg:err})

    res.status(200).json({msg:"Message sent..."})
  })
}
