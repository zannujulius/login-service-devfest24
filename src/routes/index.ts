import express, {
  Response,
  Request,
  Express,
  RouterOptions,
  Router,
} from "express";
import { authRoutes } from "./authRoutes";

const router = Router();

router.use(authRoutes);

export const routes = router;
