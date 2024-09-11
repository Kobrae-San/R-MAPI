import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    activePage: 1,
    totalPages: 1,
  },
  reducers: {
    nextPage: (state) => {
      if (state.activePage < state.totalPages) {
        state.activePage += 1;
      }
    },
    prevPage: (state) => {
      if (state.activePage > 1) {
        state.activePage -= 1;
      }
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setActivePage: (state, action) => {
      const newPage = action.payload;
      if (newPage >= 1 && newPage <= state.totalPages) {
        state.activePage = newPage;
      }
    },
  },
});

export const { nextPage, prevPage, setTotalPages, setActivePage } =
  paginationSlice.actions;
export default paginationSlice.reducer;
