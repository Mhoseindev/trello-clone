"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import Board from "@/src/components/boards/board";
import AddBoardCard from "@/src/components/boards/add-board-card";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { moveCard, reorderBoards } from "@/src/store/boardsSlice";

const Index = () => {
  const boards = useAppSelector((state) => state.boards.boards);
  const dispatch = useAppDispatch();

  const ids = boards.map((b) => `board:${b.id}`);

  const parseCardId = (s: string) => {
    const parts = s.split(":");
    // expected ["card", cardKey, "board", boardId]
    const cardKey = parts[1];
    const boardId = Number(parts[3]);
    return { cardKey, boardId };
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // Board reorder
    if (activeId.startsWith("board:") && overId.startsWith("board:")) {
      const sourceIndex = ids.indexOf(activeId);
      const destinationIndex = ids.indexOf(overId);
      if (sourceIndex === -1 || destinationIndex === -1) return;
      if (sourceIndex === destinationIndex) return;
      dispatch(reorderBoards({ sourceIndex, destinationIndex }));
      return;
    }

    // Card move when both active and over are cards
    if (activeId.startsWith("card:") && overId.startsWith("card:")) {
      const activeParts = parseCardId(activeId);
      const overParts = parseCardId(overId);

      const fromBoardId = activeParts.boardId;
      const toBoardId = overParts.boardId;

      const fromBoard = boards.find((b) => b.id === fromBoardId);
      const toBoard = boards.find((b) => b.id === toBoardId);
      if (!fromBoard || !fromBoard.cards) return;
      if (!toBoard) return;

      // find index by uid or numeric id
      const findIndexByKey = (
        cards: typeof fromBoard.cards | undefined,
        key: string,
      ) => {
        if (!cards) return -1;
        const asNumber = Number(key);
        const byUid = cards.findIndex((c) => c.uid === key);
        if (byUid !== -1) return byUid;
        if (!Number.isNaN(asNumber))
          return cards.findIndex((c) => c.id === asNumber);
        return -1;
      };

      const fromIndex = findIndexByKey(fromBoard.cards, activeParts.cardKey);
      const toIndexFound = findIndexByKey(toBoard.cards, overParts.cardKey);
      const destIndex =
        toIndexFound === -1 ? (toBoard.cards?.length ?? 0) : toIndexFound;
      if (fromIndex === -1) return;
      if (fromBoardId === toBoardId && fromIndex === destIndex) return;

      dispatch(
        moveCard({ fromBoardId, toBoardId, fromIndex, toIndex: destIndex }),
      );
      return;
    }

    // Card move when active is a card and over is a board (drop onto empty board or board area)
    if (activeId.startsWith("card:") && overId.startsWith("board:")) {
      const activeParts = parseCardId(activeId);
      const fromBoardId = activeParts.boardId;
      const toBoardId = Number(overId.split(":")[1]);

      const fromBoard = boards.find((b) => b.id === fromBoardId);
      const toBoard = boards.find((b) => b.id === toBoardId);
      if (!fromBoard || !fromBoard.cards) return;
      if (!toBoard) return;

      const findIndexByKey = (
        cards: typeof fromBoard.cards | undefined,
        key: string,
      ) => {
        if (!cards) return -1;
        const asNumber = Number(key);
        const byUid = cards.findIndex((c) => c.uid === key);
        if (byUid !== -1) return byUid;
        if (!Number.isNaN(asNumber))
          return cards.findIndex((c) => c.id === asNumber);
        return -1;
      };

      const fromIndex = findIndexByKey(fromBoard.cards, activeParts.cardKey);
      const destIndex = toBoard.cards ? toBoard.cards.length : 0;
      if (fromIndex === -1) return;
      if (fromBoardId === toBoardId && fromIndex === destIndex) return;

      dispatch(
        moveCard({ fromBoardId, toBoardId, fromIndex, toIndex: destIndex }),
      );
      return;
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className={"boards-wrapper"}>
          {boards.map((board) => (
            <Board board={board} key={board.id} />
          ))}
          <AddBoardCard />
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Index;
