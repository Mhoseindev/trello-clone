"use client";
import React from "react";
import { useAppSelector } from "@/src/store/hooks";
import Board from "@/src/components/boards/board";

const Index = () => {
  const boards = useAppSelector((state) => state.boards.boards);
  return (
    <>
      {boards.map((board) => (
        <Board board={board} key={board.id} />
      ))}
    </>
  );
};

export default Index;
