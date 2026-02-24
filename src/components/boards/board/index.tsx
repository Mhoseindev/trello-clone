"use client";
import React from "react";
import Card from "@/src/components/boards/card";
import { Board } from "@/src/interfaces/boards";
import AddNewCard from "@/src/components/boards/add-new-card";
import ListActions from "@/src/components/boards/list-actions";
import { useAppDispatch } from "@/src/store/hooks";
import { clearBoardCards, removeBoard } from "@/src/store/boardsSlice";

type PropsType = {
  board: Board;
};

const Index = ({ board }: PropsType) => {
  const dispatch = useAppDispatch();

  const handleDeleteAllCards = (boardId: number) => {
    dispatch(clearBoardCards({ boardId }));
  };

  const handleDeleteBoard = (boardId: number) => {
    dispatch(removeBoard({ id: boardId }));
  };

  return (
    <div className={"board"}>
      <div className={"header"}>
        <h2 className={"header-title"}>{board.name}</h2>
        <ListActions
          boardId={board.id}
          onDeleteAllCardsAction={handleDeleteAllCards}
          onDeleteBoardAction={handleDeleteBoard}
        />
      </div>
      <div className={"body"}>
        {board.cards?.map((card) => (
          <Card key={card.id} boardId={board.id} card={card} />
        ))}
      </div>
      <AddNewCard boardId={board.id} />
    </div>
  );
};

export default Index;
