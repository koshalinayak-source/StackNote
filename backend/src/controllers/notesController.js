import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {

        const notes = await Note.find().sort({ createdAt: -1 }); // newest first andwill give every single note
        res.status(200).json(notes);

    } catch (error) {
        console.log("Error in getAllNotes method :", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}
export async function getNoteById(req, res) {
  try {

    const note = await Note.findById(req.params.id); //will give the specific note by id
    if(!note){
        return res.status(404).json({message:"Note Not Found"});
    }
    res.status(200).json(note);

  } catch (error) {

    console.log("Error in getNoteById method :", error);
    res.status(500).json({ message: "Internal Server error" });

  }
}

export async function createNotes(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });

        await newNote.save();
        res.status(201).json({ message: "Note created succesfully" });

    } catch (error) {
        console.log("Error in createNotes method :", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}
export async function updateNotes(req, res) {
    try {
        const { title, content } = req.body;
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title,content },
            { new: true }
        ); //only update the content

        if (!updateNote) {
            return res.status(404).json({ message: "Note Not Found" });
        }

        res.status(200).json({ message: "Note updated succesfully" });
    } catch (error) {
        console.log("Error in updateNotes method :", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}
export async function deleteNotes(req, res) {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);

        if(!deleteNote){
            return res.status(404).json({message:"Note Not Found"});
        }

        res.status(200).json({ message: "Note deleted succesfully" });
    } catch (error) {
        console.log("Error in updateNotes method :", error);
        res.status(500).json({ message: "Internal Server error"});
    }
}
