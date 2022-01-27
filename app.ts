import createError, { HttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
const  cors = require("cors");
import product_routes from "./routes/product_routes";
import connect from "./config/connectDb";
const session = require("express-session");
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
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
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {maxAge: 180 * 60 * 3 * 4000}

  })
);





// Passport middleware



app.use(cors({origin:true))
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

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
