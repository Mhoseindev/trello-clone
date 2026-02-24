"use client";

import React, { useState } from "react";
import type { Card as CardType } from "@/src/interfaces/boards";
import CommentModal from "@/src/components/boards/card/comment-modal";

type PropsType = {
  boardId: number;
  card: CardType;
};

const Index = ({ boardId, card }: PropsType) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={"card"}>
      <h3 className={"card-title"}>{card.name}</h3>

      <div className={"flex justify-end"}>
        <button className={"card-action"} onClick={() => setOpen(true)}>
          comments
        </button>
      </div>

      {open && (
        <CommentModal
          boardId={boardId}
          cardId={card.id}
          comments={card.comments}
          onCloseAction={() => setOpen(false)}
          title={card.name}
        />
      )}
    </div>
  );
};

export default Index;
