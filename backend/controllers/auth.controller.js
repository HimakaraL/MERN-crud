import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPword });
  try {
    await newUser.save();
    res.status(200).json("User Created Successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(req.body.password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password, ...userDetails } = validUser._doc;
    const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
      })
      .status(200)
      .json({
        success: true,
        userDetails,
        message: "Login Successful",
      });
  } catch (error) {
    next(error);
  }
};
