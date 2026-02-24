import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Board, Card } from "@/src/interfaces/boards";

const makeUid = (boardId: number, cardId: number) =>
  `${boardId}-${cardId}-${Date.now()}`;

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
          uid: makeUid(1, 1),
          name: "Card 1",
          comments: [],
        },
        {
          id: 2,
          uid: makeUid(1, 2),
          name: "Card 2",
          comments: [],
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
        const newCard: Card = {
          id: nextId,
          uid: makeUid(b.id, nextId),
          name: action.payload.name,
          comments: [],
        };
        b.cards = [...(b.cards ?? []), newCard];
      }
    },

    addComment(
      state: BoardsState,
      action: PayloadAction<{
        boardId: number;
        cardId: number;
        text: string;
        author?: string;
      }>,
    ) {
      const b = state.boards.find(
        (x: Board) => x.id === action.payload.boardId,
      );
      if (!b || !b.cards) return;
      const c = b.cards.find((x: Card) => x.id === action.payload.cardId);
      if (!c) return;
      const nextId =
        c.comments && c.comments.length > 0
          ? Math.max(...c.comments.map((cm) => cm.id)) + 1
          : 1;
      const newComment = {
        id: nextId,
        text: action.payload.text,
        author: action.payload.author ?? "",
        createdAt: new Date().toISOString(),
      };
      c.comments = [...(c.comments ?? []), newComment];
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

    // New reducer to reorder boards by index
    reorderBoards(
      state: BoardsState,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>,
    ) {
      const { sourceIndex, destinationIndex } = action.payload;
      if (
        sourceIndex === destinationIndex ||
        sourceIndex < 0 ||
        destinationIndex < 0 ||
        sourceIndex >= state.boards.length ||
        destinationIndex >= state.boards.length
      ) {
        return;
      }
      const copied = [...state.boards];
      const [moved] = copied.splice(sourceIndex, 1);
      copied.splice(destinationIndex, 0, moved);
      state.boards = reindexBoards(copied);
    },

    // New reducer to move a card between/within boards
    moveCard(
      state: BoardsState,
      action: PayloadAction<{
        fromBoardId: number;
        toBoardId: number;
        fromIndex: number;
        toIndex: number;
        cardId?: number;
      }>,
    ) {
      const { fromBoardId, toBoardId, fromIndex, toIndex } = action.payload;
      if (fromIndex < 0 || toIndex < 0) return;
      const fromBoard = state.boards.find((b) => b.id === fromBoardId);
      const toBoard = state.boards.find((b) => b.id === toBoardId);
      if (!fromBoard || !fromBoard.cards) return;
      if (!toBoard) return;
      const copiedFromCards = [...(fromBoard.cards ?? [])];
      if (fromIndex >= copiedFromCards.length) return;
      const [moved] = copiedFromCards.splice(fromIndex, 1);
      // remove from source
      fromBoard.cards = copiedFromCards;
      // insert into destination
      const copiedToCards = [...(toBoard.cards ?? [])];

      // ensure moved card has a uid; if collides with existing uid, generate a new uid
      if (!moved.uid) moved.uid = makeUid(toBoard.id, moved.id);
      if (copiedToCards.some((c) => c.uid === moved.uid)) {
        // create a new uid based on toBoard and moved.id
        moved.uid = makeUid(toBoard.id, moved.id);
      }

      const insertIndex = Math.min(toIndex, copiedToCards.length);
      copiedToCards.splice(insertIndex, 0, moved);
      toBoard.cards = copiedToCards;
    },

    // Ensure all cards have uid (run on app start or when hydrating)
    ensureCardUids(state: BoardsState) {
      state.boards.forEach((b) => {
        if (!b.cards) return;
        b.cards.forEach((c) => {
          if (!c.uid) {
            c.uid = makeUid(b.id, c.id);
          }
        });
      });
    },
  },
});

export const {
  editBoardTitle,
  clearBoardCards,
  addCard,
  addComment,
  removeBoard,
  addBoard,
  setBoards,
  reorderBoards,
  moveCard,
  ensureCardUids,
} = boardsSlice.actions;
export default boardsSlice.reducer;
