import { configureStore } from "@reduxjs/toolkit";
import TagSlice from "../Features/TagsSlice";
import NoteSlice from "../Features/NoteSlice";
export const store = configureStore({
  reducer: {
    TagSlice,
    NoteSlice,
  },
});
