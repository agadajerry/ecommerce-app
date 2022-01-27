
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
require("dotenv").config();
import { validateUser } from "../utils/validateData";
const jwt =  require("jsonwebtoken");
import User from "../models/userModel";

const router = express.Router();


//--------------- registration of new user -----------------------

export const userRegistration = async (req: Request, res: Response) => {
  try {
    const { fullname, email, phoneNumber, address, password, repeat_password } =
      req.body;

    // Validating with joi
    const { error } = validateUser(req.body);
    console.log(error)
    if (error) {
     return  res.json(error);
      }
      
      // rLook for a user if found, let he in

      User.findOne({ email: req.body.email},async (err: any, user: any) => {
          if (err) {
               res.status(404).json(err)
          }
          if (user) {
             res.status(201).json("user exist")
          } else {

             user = new User({
                fullname,
                email,
                phoneNumber,
                address,
                password: await bcrypt.hash(req.body.password,10)
             });
              
              await user.save();
              
             
              res.status(200).json("user registered")
          }
      });

    
  } catch (error) {console.error("Registration error has occured")}
};

//---------------------- Login  implementation  for users---------------------------


//Login routes
export const userLogin =  (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password.length) {
        res.status(404).json("empty empty fields")
        return;
    }

    User.findOne({ email: req.body.email }, async (err: any, user: any) => {
        if (err) {
          return  res.status(404).json(err) 
        }
    
        if (!user) {
            return res.status(403).json("user does not exist");
        }
        //validate the password

        let validPass = await bcrypt.compare(req.body.password, user.password);

        if (!validPass) {
            return res.status(404).json({ msg: "password or email incorrect" });
        } else {
          //save the jwt token

          const maxAge = 1 * 24 * 60 * 60;
          const access_token = await jwt.sign({ email:email }, process.env.JWT_SECRET_KEY,
            {
              expiresIn: maxAge,
            }
          );
          
          
          res.cookie("jwt", access_token, { httpOnly: true });
          return res
            .status(200)
            .json({
              msg: "login successful",
              isLogin: true,
              name: user.fullname,
              userId:user._id
            });
        }
        

    });

}
export async function logout(req: Request, res: Response) {
  res.clearCookie("jwt");
  res.json("login page after logout");
}

export default router;
