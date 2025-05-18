import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body)
  const hashedPword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ username, email, password:hashedPword });
  console.log(newUser)
  try {
    await newUser.save();
    res.status(200).json("User Created Successfully");
  } catch (error) {
    next(error)
  }
};
