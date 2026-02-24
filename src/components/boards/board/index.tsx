"use client";
import React from "react";
import Card from "@/src/components/boards/card";
import { Board } from "@/src/interfaces/boards";
import AddNewCard from "@/src/components/boards/add-new-card";

type PropsType = {
  board: Board;
};

const Index = ({ board }: PropsType) => {
  return (
    <div className={"board"}>
      <div className={"header"}>
        <h2 className={"header-title"}>{board.name}</h2>
      </div>
      <div className={"body"}>
        {board.cards?.map((card) => (
          <Card key={card.id} title={card.name} />
        ))}
      </div>
      <AddNewCard boardId={board.id} />
    </div>
  );
};

export default Index;
