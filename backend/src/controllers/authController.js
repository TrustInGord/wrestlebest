import { User } from "../models/userModel.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { createTokens } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);

    await User.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });

    res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Username already exists",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const passwordMatched = await verifyPassword(password, user.password);

    if (!passwordMatched) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const tokens = createTokens(user);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.status(200).json({
      token: tokens.accessToken,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login failed",
    });
  }
};