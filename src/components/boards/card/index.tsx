"use client";

import React, { useState } from "react";
import type { Card as CardType } from "@/src/interfaces/boards";
import CommentModal from "@/src/components/boards/card/comment-modal";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type PropsType = {
  boardId: number;
  card: CardType;
};

const Index = ({ boardId, card }: PropsType) => {
  const [open, setOpen] = useState(false);
  const [dndActive, setDndActive] = useState(false);

  const cardKey = card.uid ?? card.id;
  const sortableId = `card:${cardKey}:board:${boardId}`;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: sortableId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  const enableDnd = () => setDndActive(true);
  const disableDnd = () => setDndActive(false);

  return (
    <div
      className={"card"}
      ref={setNodeRef}
      style={style}
      onMouseEnter={enableDnd}
      onMouseLeave={disableDnd}
      onTouchStart={enableDnd}
      onTouchEnd={disableDnd}
      {...(dndActive ? { ...attributes, ...listeners } : {})}
    >
      <div className={"card-handle-and-title"}>
        <h3 className={"card-title"}>{card.name}</h3>
      </div>

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
