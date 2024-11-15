import express, {
  Response,
  Request,
  Express,
  RouterOptions,
  Router,
} from "express";
import { AuthController } from "../controller/authController";

const router = Router();

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

export const authRoutes = router;
