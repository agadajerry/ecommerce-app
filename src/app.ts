import createError, { HttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import product_routes from "./routes/product_routes";
import connect from "./config/connectDb";
const session = require("express-session");
require("dotenv").config();
const port = process.env.PORT || 4000;
const app = express();
const mongoDBStore = require ("connect-mongodb-session")(session);



connect();
//
// Express session
const uri  = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@cluster0.6wnbf.mongodb.net/ecommerceapp?retryWrites=true&w=majority";

const store = new mongoDBStore({
  uri:uri,
  collection:"session"
})





app.use(
  cors({
    origin: "https://ecommerce-api-server.herokuapp.com/product", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes functions

app.use("/product", product_routes);


// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
export default app;
