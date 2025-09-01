import { Response } from "express";
import Note from "../models/Note.js";
import { AuthedRequest } from "../middleware/auth.js";

// GET /api/notes
export const listNotes = async (req: AuthedRequest, res: Response) => {
  const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(notes);
};

// POST /api/notes  { content }
export const createNote = async (req: AuthedRequest, res: Response) => {
  const { content } = req.body as { content?: string };
  if (!content) return res.status(400).json({ msg: "Content required" });
  const note = await Note.create({ userId: req.userId!, content });
  res.status(201).json(note);
};

// DELETE /api/notes/:id
export const deleteNote = async (req: AuthedRequest, res: Response) => {
  const { id } = req.params;
  const deleted = await Note.findOneAndDelete({ _id: id, userId: req.userId });
  if (!deleted) return res.status(404).json({ msg: "Note not found" });
  res.json({ msg: "Deleted" });
};
