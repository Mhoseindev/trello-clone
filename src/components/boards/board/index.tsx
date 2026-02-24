import React from "react";
import Card from "@/src/components/boards/card";
import { Board } from "@/src/interfaces/boards";

type PropsType = {
  board: Board;
};

const Index = ({ board }: PropsType) => {
  return (
    <div className={"board"}>
      <div className={"header"}>
        <h2 className={"header-title"}>
          {board.name} - {board.id}
        </h2>
      </div>
      <div className={"body"}>
        {board.cards?.map((card) => (
          <Card key={card.id} title={card.name} />
        ))}
      </div>
      <button className={"board-action"}>Add Another Card</button>
    </div>
  );
};

export default Index;
