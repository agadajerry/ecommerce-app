"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = __importDefault(require("./routes/product_routes"));
const connectDb_1 = __importDefault(require("./config/connectDb"));
const session = require("express-session");
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const port = process.env.PORT || 4000;
const app = (0, express_1.default)();
const mongoDBStore = require("connect-mongodb-session")(session);
(0, connectDb_1.default)();
//
// Express session
const uri = "mongodb+srv://" + process.env.USERNAME + ":" + process.env.PASSWORD + "@cluster0.6wnbf.mongodb.net/ecommerceapp?retryWrites=true&w=majority";
const store = new mongoDBStore({
    uri: uri,
    collection: "session"
});
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: { maxAge: 180 * 60 * 3 * 4000 }
}));
// Passport middleware
app.use((0, cors_1.default)({
    origin: "https://ecommerce-api-server.herokuapp.com/product",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
}));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../views"));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
//routes functions
app.use("/product", product_routes_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, _next) {
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
exports.default = app;
