import { createSlice } from "@reduxjs/toolkit";

const initialTags = {
  tags: [],
};

const TagsSlice = createSlice({
  name: "tags",
  initialState: initialTags,
  reducers: {
    addTags: (state, action) => {
      state.tags = [...state.tags, action.payload];
    },
    deleteTags: (state, action) => {
      state.tags = state.tags.filter(
        (value, index) => index !== action.payload
      );
    },
  },
});

export const { deleteTags, addTags } = TagsSlice.actions;
export default TagsSlice.reducer;
