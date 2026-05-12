import { User } from "../models/user_model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Validation: Check if all fields are filled first
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if the user already exists (using correct schema field: username)
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }

    // 3. Create a new user
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username, // Fixed property name
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" }); // Security best practice: don't say exactly what was wrong
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username, // Fixed property name
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Note: Actual logout logic usually involves clearing a JWT cookie or deleting a session.
    // This is a basic implementation placeholder.
    res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export { registerUser, loginUser, logoutUser };
