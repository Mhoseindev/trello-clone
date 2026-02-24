import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Board } from "@/src/interfaces/boards";

type BoardsState = {
  boards: Board[];
};

const initialState: BoardsState = {
  boards: [
    {
      id: "1",
      name: "ToDo",
      cards: [],
    },
    {
      id: "2",
      name: "In Progress",
      cards: [],
    },
    {
      id: "3",
      name: "Done",
      cards: [],
    },
  ],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    editBoardTitle(
      state: BoardsState,
      action: PayloadAction<{ id: string; name: string }>,
    ) {
      const b = state.boards.find((x: Board) => x.id === action.payload.id);
      if (b) {
        b.name = action.payload.name;
      }
    },

    clearBoardCards(
      state: BoardsState,
      action: PayloadAction<{ boardId: string }>,
    ) {
      const b = state.boards.find(
        (x: Board) => x.id === action.payload.boardId,
      );
      if (b) {
        b.cards = [];
      }
    },

    removeBoard(state: BoardsState, action: PayloadAction<{ id: string }>) {
      state.boards = state.boards.filter(
        (x: Board) => x.id !== action.payload.id,
      );
    },

    // helpers
    addBoard(state: BoardsState, action: PayloadAction<Board>) {
      state.boards.push(action.payload);
    },

    setBoards(state: BoardsState, action: PayloadAction<Board[]>) {
      state.boards = action.payload;
    },
  },
});

export const {
  editBoardTitle,
  clearBoardCards,
  removeBoard,
  addBoard,
  setBoards,
} = boardsSlice.actions;
export default boardsSlice.reducer;
