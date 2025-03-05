import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/v1/auth.route"
import homeRoutes from "./routes/v1/index.route";
import ticketRoutes from "./routes/v1/ticket.route";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use("/api/v1", homeRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ticket", ticketRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
