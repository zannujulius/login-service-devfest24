import express, { Response, Request, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { routes } from "./routes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(morgan("dev"));

// Middleware
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send("Welcome to the Ecommerce APP.\n");
});

app.use(routes);

const PORT = process.env.PORT;

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: " Route Not found",
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.response) {
    res.status(err.response.status).json({
      message: err.response?.data.message,
    });
    return;
  }
  res.status(500).json({ err });
});

export default app;
