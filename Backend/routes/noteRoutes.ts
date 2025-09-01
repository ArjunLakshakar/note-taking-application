import express from "express";
import { auth } from "../middleware/auth.js";
import { listNotes, createNote, deleteNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/", auth, listNotes);
router.post("/", auth, createNote);
router.delete("/:id", auth, deleteNote);

export default router;
