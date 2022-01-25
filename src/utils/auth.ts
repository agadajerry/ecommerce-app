import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    token = req.cookies.jwt;

    if (!token) {
      return res.json({ unauthorised: "You are not authorised" });
    }

    const decodedToken: any = jwt.verify(
      token as string,
      process.env.JWT_SECRET_KEY as string
    );
    const user = await User.findOne({ email: decodedToken.email });
    req.user = user;

    next();
  } catch (err: any) {
    res.json(err);
  }
};
