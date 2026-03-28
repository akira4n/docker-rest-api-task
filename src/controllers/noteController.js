const Note = require("../models/Note");

// GET /api/notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.getAll();
    res.status(200).json({ data: notes });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST /api/notes
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const newNote = await Note.create(title, content);

    res.status(201).json({
      message: "Note created successfully",
      data: newNote,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PATCH /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.update(id, title, content);

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ message: "Note updated", data: updatedNote });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.remove(id);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted", data: deletedNote });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
