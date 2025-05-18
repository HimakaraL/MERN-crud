import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ name, email, hashedPword });
  try {
    await newUser.save();
    res.status(200).json("User Created Successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
