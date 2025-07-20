import express from "express";
import {
  getAllNotes,
  getNoteById,
  createNotes,
  deleteNotes,
  updateNotes,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);  //to get a specific note
router.post("/", createNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router;
