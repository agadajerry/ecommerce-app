"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Load User model
const Admin = require("../models/Admin");
module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        // Match user
        Admin.findOne({
            email: email,
        }).then((admin) => {
            if (!admin) {
                return done(null, false, {
                    message: "That email is not registered",
                });
            }
            // Match password
            bcryptjs_1.default.compare(password, admin.password, (err, isMatch) => {
                if (err)
                    throw err;
                if (isMatch) {
                    return done(null, admin);
                }
                else {
                    return done(null, false, { message: "Password incorrect" });
                }
            });
        });
    }));
    passport.serializeUser(function (admin, done) {
        done(null, admin.id);
    });
    passport.deserializeUser(function (id, done) {
        Admin.findById(id, function (err, admin) {
            done(err, admin);
        });
    });
};
