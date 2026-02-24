import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Board } from "@/src/interfaces/boards";

type BoardsState = {
  boards: Board[];
};

const initialState: BoardsState = {
  boards: [
    {
      id: 1,
      name: "ToDo",
      cards: [
        {
          id: 1,
          name: "Card 1",
        },
        {
          id: 2,
          name: "Card 2",
        },
      ],
    },
    {
      id: 2,
      name: "In Progress",
      cards: [],
    },
    {
      id: 3,
      name: "Done",
      cards: [],
    },
  ],
};

const reindexBoards = (boards: Board[]) => {
  return boards.map((b, idx) => ({ ...b, id: idx + 1 }));
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    editBoardTitle(
      state: BoardsState,
      action: PayloadAction<{ id: number; name: string }>,
    ) {
      const b = state.boards.find((x: Board) => x.id === action.payload.id);
      if (b) {
        b.name = action.payload.name;
      }
    },

    clearBoardCards(
      state: BoardsState,
      action: PayloadAction<{ boardId: number }>,
    ) {
      const b = state.boards.find(
        (x: Board) => x.id === action.payload.boardId,
      );
      if (b) {
        b.cards = [];
      }
    },

    addCard(
      state: BoardsState,
      action: PayloadAction<{ boardId: number; name: string }>,
    ) {
      const b = state.boards.find(
        (x: Board) => x.id === action.payload.boardId,
      );
      if (b) {
        const nextId =
          b.cards && b.cards.length > 0
            ? Math.max(...b.cards.map((c) => c.id)) + 1
            : 1;
        const newCard = {
          id: nextId,
          name: action.payload.name,
        } as unknown as any;
        b.cards = [...(b.cards ?? []), newCard];
      }
    },

    removeBoard(state: BoardsState, action: PayloadAction<{ id: number }>) {
      state.boards = state.boards.filter(
        (x: Board) => x.id !== action.payload.id,
      );
      state.boards = reindexBoards(state.boards);
    },

    // helpers
    addBoard(state: BoardsState, action: PayloadAction<Omit<Board, "id">>) {
      state.boards.push({ ...action.payload, id: state.boards.length + 1 });
      state.boards = reindexBoards(state.boards);
    },

    setBoards(state: BoardsState, action: PayloadAction<Board[]>) {
      state.boards = reindexBoards(action.payload);
    },
  },
});

export const {
  editBoardTitle,
  clearBoardCards,
  addCard,
  removeBoard,
  addBoard,
  setBoards,
} = boardsSlice.actions;
export default boardsSlice.reducer;
