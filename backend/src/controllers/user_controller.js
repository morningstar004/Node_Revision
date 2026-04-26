import { User } from "../models/user_model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }

    // all fields should be filled
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new user 

    const user = await User.create({
        username,
        email,
        password,
        loggedIn: false
    });
    res.status(201).json({ 
        message: "User registered successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
        } });
  } catch (error) {
    res.status(500).json({ message:`Internal Server Error: ${error.message}` });
  }
};


export { registerUser};