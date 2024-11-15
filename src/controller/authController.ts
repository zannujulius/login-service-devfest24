import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import dotenv from "dotenv";
import { Status } from "../utils";
import { User } from "../models/user";

dotenv.config();

export class AuthController {
  // Login user
  static async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    // Check if user exists
    const [userQuery] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (userQuery.length === 0) {
      return res.status(401).json({
        message: "User not registered or invalid user name or password",
      });
    }

    const user = userQuery[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      String(process.env["JWT_TOKEN"]),
      { expiresIn: "1h" }
    );

    delete user.password;

    return res.status(200).json({ user, status: Status.Success, token });
  }

  static async register(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res
        .status(400)
        .json({ message: "Username and Password are required." });
    }

    const image =
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?semt=ais_hybrid";

    // Check if the user already exists
    const [existingUser] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const [newUser] = await pool.query<ResultSetHeader>(
      `INSERT INTO users (username, image, password, created_at)
       VALUES (?, ?, ?, NOW())`,
      [username, image, hashedPassword]
    );

    if (newUser.affectedRows != 1) {
      return res.status(500).json({
        message: "Failed to save user",
      });
    }

    // Return user data (without password)
    const user: User = req.body;

    user.image = image;

    delete user.password;

    return res.status(201).json({ user, status: Status.Success });
  }
}
