import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.js";
import { me, signupOtp, signinOtp, verifyOtp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup-otp", signupOtp);
router.post("/signin-otp", signinOtp);
router.post("/verify-otp", verifyOtp);
router.get("/me", auth, me);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Redirect directly to frontend with token & user info
    const redirectUrl = `http://localhost:5173/auth-success?token=${token}&user=${encodeURIComponent(
      JSON.stringify(user)
    )}`;
    res.redirect(redirectUrl);
  }
);


export default router;
