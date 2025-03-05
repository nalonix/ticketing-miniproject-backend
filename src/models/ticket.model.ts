import mongoose, { Schema, Document } from "mongoose";

export interface ITicket extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
}

const TicketSchema = new Schema<ITicket>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Open", "In Progress", "Closed"], default: "Open" },
}, { timestamps: true });

export default mongoose.model<ITicket>("Ticket", TicketSchema);
