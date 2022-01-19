import express from "express";
import { userModel } from "../../database/user/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import { ValidateSignup, ValidateSignin } from "../../Validation/auth";

require("dotenv").config();
const router = express.Router();

//Signup Router
router.post("/register", async (req, res) => {
  try {
    await ValidateSignup(req.body);
    const { email, password, fullname, phoneNumber } = req.body;
    const checkUserByEmail = await userModel.findOne({ email });
    const checkUserByPhone = await userModel.findOne({ phoneNumber });
    if (checkUserByEmail || checkUserByPhone) {
      return res.json("User already exist with above email || phon Number");
    }

    //Password Encryption
    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    //Save to DB
    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });

    const { _id } = newUser;

    //generate JWT token
    const token = jwt.sign(
      { user: { _id, fullname, email } },
      process.env.JWT_SECRET
    );

    return res.status(201).json({ token, status: "User Created Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    await ValidateSignin(req.body);
    const user = await userModel.findOne({ email: req.body.email });
    !user && res.status(400).json("User not found with this email");

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(400).json("Wrong Credentials");
    }
    const { _id, fullname, email } = user;
    const token = jwt.sign(
      { user: { _id, fullname, email } },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    return res.status(200).json({ token, status: "User login Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.json({ token: req.session.passport.user.token });
  }
);
module.exports = router;
