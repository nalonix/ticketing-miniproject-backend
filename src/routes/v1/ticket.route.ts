import express from "express";
import { isAdmin, protect } from "../../middleware/auth.middleware";
import { createTicket, getTickets, updateTicketStatus } from "../../controllers/v1/ticket.controller";


const router = express.Router();

// Protected routes
router.post("/", protect, createTicket); 
router.get("/", protect, getTickets);  
router.put("/:id", protect, updateTicketStatus);  

export default router;
