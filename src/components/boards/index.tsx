"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import Board from "@/src/components/boards/board";
import AddBoardCard from "@/src/components/boards/add-board-card";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { reorderBoards } from "@/src/store/boardsSlice";

const Index = () => {
  const boards = useAppSelector((state) => state.boards.boards);
  const dispatch = useAppDispatch();

  const ids = boards.map((b) => String(b.id));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const sourceIndex = ids.indexOf(String(active.id));
    const destinationIndex = ids.indexOf(String(over.id));
    if (sourceIndex === -1 || destinationIndex === -1) return;
    if (sourceIndex === destinationIndex) return;
    dispatch(reorderBoards({ sourceIndex, destinationIndex }));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
