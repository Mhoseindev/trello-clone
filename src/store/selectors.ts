import type { RootState } from "./store";
import type { Board } from "@/src/interfaces/boards";

export const selectBoards = (state: RootState): Board[] => state.boards.boards;
export const selectBoardById = (
  state: RootState,
  id: string,
): Board | undefined => state.boards.boards.find((b) => b.id === id);
