"use client";
import React from "react";
import { useAppSelector } from "@/src/store/hooks";
import Board from "@/src/components/boards/board";
import AddBoardCard from "@/src/components/boards/add-board-card";

const Index = () => {
  const boards = useAppSelector((state) => state.boards.boards);
  return (
    <div className={"boards-wrapper"}>
      {boards.map((board) => (
        <Board board={board} key={board.id} />
      ))}
      <AddBoardCard />
    </div>
  );
};

export default Index;
