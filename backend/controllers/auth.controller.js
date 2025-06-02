import passport from "passport";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";
import { ORIGIN } from "../config/env.js";
import User from "../models/user.model.js";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = (req, res) => {
    const token = generateToken(req.user);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.redirect(ORIGIN);
};

export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
}

export const getUserInfo = async (req, res, next) => {
    try {
        if(!req.userId){
            const error = new Error("User not authenticated");
            error.status = 401;
            throw error;
        }
        const user = await User.findById(req.userId)
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        return res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        });

    } catch (error) {
        next(error);
    }
};