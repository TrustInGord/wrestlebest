import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} from "../middlewares/validation.js";

const authRouter = Router();

authRouter.post("/login", validateLogin, handleValidationErrors, login);
authRouter.post("/register", validateRegister, handleValidationErrors, register);

export { authRouter };