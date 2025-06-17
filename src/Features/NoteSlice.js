import { createSlice } from "@reduxjs/toolkit";

const initialNoteState = {
  notes: [],
};

const NoteSlice = createSlice({
  name: "notes",
  initialState: initialNoteState,
  reducers: {
    addNotes: (state, action) => {
      state.notes.push(action.payload);
    },

    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    }
  },
});

export const { addNotes, deleteNote, movetoTrash } = NoteSlice.actions;
export default NoteSlice.reducer;
