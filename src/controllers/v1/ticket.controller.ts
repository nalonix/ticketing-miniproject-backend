import { Request, Response } from "express";
import Ticket from "../../models/ticket.model";



// TODO: move out to type declaration
interface AuthRequest extends Request {
    user?: any;
}

// Create a ticket (User only)
export const createTicket = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description } = req.body;
  const userId = req?.user?.id;

  try {
    const ticket = new Ticket({
      user: userId,
      title,
      description,
      status: "Open",
    });

    await ticket.save();
    res.status(201).json({ message: "Ticket created successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get tickets - for normal users only their own tickets, for admins everything
export const getTickets = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req?.user?.id;
  const role = req?.user?.role;

  try {
    let tickets;

    if (role === "admin") {
      tickets = await Ticket.find().populate("user", "name email");
    } else {
      tickets = await Ticket.find({ user: userId }).populate("user", "name email");
    }

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update ticket status  admin only, make sue to add another middleware
export const updateTicketStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  const { status } = req.body;
  const ticketId = req.params.id;

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return; 
    }

    ticket.status = status;
    await ticket.save();

    res.status(200).json({ message: "Ticket status updated", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};