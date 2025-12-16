import { verifyJWT } from "../utils/jwt.js";

export const auth = (req, res, next) => {
  const bearer = req.header("authorization");
  const token = bearer?.split(" ").pop();

  if (!token) {
    return res.status(401).json({
      message: "Auth denied",
    });
  }

  try {
    const payload = verifyJWT(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Auth denied - invalid token",
    });
  }
};