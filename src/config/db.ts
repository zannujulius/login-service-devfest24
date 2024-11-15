import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create the MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true, // Allow multiple SQL statements in one query
});

export const initDb = async () => {
  try {
    // Create the database if it doesn't exist
    await pool.query(`CREATE DATABASE IF NOT EXISTS ecommerce_db`);

    // Use the 'exchange' database
    await pool.query(`USE ecommerce_db`);

    // Create the users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create the products table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            price INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `);

    console.log("Database and tables initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
};

// Initialize the database

export default pool;
