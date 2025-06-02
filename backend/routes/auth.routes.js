import { Router } from "express";
import { getUserInfo, googleAuth, googleAuthCallback, logout } from "../controllers/auth.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import passport from "passport";

const authRouter = Router();

authRouter.get("/google", googleAuth);
authRouter.get("/google/callback",passport.authenticate("google", { session: false, failureRedirect: '/auth/failure' }), googleAuthCallback);
authRouter.get("/logout", logout);
authRouter.get("/user", authorize ,getUserInfo);

export default authRouter;