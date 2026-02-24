"use client";
import React from "react";
import Card from "@/src/components/boards/card";
import { Board } from "@/src/interfaces/boards";
import AddNewCard from "@/src/components/boards/add-new-card";
import ListActions from "@/src/components/boards/list-actions";
import { useAppDispatch } from "@/src/store/hooks";
import { clearBoardCards, removeBoard } from "@/src/store/boardsSlice";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type PropsType = {
  board: Board;
};

const Index = ({ board }: PropsType) => {
  const dispatch = useAppDispatch();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `board:${board.id}` });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  const handleDeleteAllCards = (boardId: number) => {
    dispatch(clearBoardCards({ boardId }));
  };

  const handleDeleteBoard = (boardId: number) => {
    dispatch(removeBoard({ id: boardId }));
  };

  const cardIds =
    board.cards?.map((c) => `card:${c.uid ?? c.id}:board:${board.id}`) ?? [];

  return (
    <div className={"board"} ref={setNodeRef} style={style}>
      <div className={"header"}>
        <h2 className={"header-title"} {...attributes} {...listeners}>
          {board.name}
        </h2>
        <ListActions
          boardId={board.id}
          onDeleteAllCardsAction={handleDeleteAllCards}
          onDeleteBoardAction={handleDeleteBoard}
        />
      </div>
      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        <div className={"body"}>
          {board.cards?.map((card) => (
            <Card
              key={`card:${card.uid ?? card.id}:board:${board.id}`}
              boardId={board.id}
              card={card}
            />
          ))}
        </div>
      </SortableContext>
      <AddNewCard boardId={board.id} />
    </div>
  );
};

export default Index;
