"use client";
import React from "react";
import { useAppSelector } from "@/src/store/hooks";
import Board from "@/src/components/boards/board";
import AddListCard from "@/src/components/boards/AddListCard";

const Index = () => {
  const boards = useAppSelector((state) => state.boards.boards);
  return (
    <div className={"boards-wrapper"}>
      {boards.map((board) => (
        <Board board={board} key={board.id} />
      ))}
      <AddListCard />
    </div>
  );
};

export default Index;
