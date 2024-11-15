import http from "http";
import dotenv from "dotenv";
import app from "./app";
import { initDb } from "./config/db";

dotenv.config();

const PORT: number = Number(process.env["PORT"]);
const server = http.createServer(app);

async function startServer() {
  // broker.startBroker();
  // initialize db connection
  initDb();
  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    console.log("-".repeat(30));
    console.log("Welcome to the Eccommerce App");
    console.log("-".repeat(30));
    console.log("Use /auth/login for Login");
    console.log("Use /auth/register to register Login");
    console.log("-".repeat(30));
  });
}

startServer();
