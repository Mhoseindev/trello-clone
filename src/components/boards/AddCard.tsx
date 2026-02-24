"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/src/store/hooks";
import { addCard } from "@/src/store/boardsSlice";

type Props = { boardId: number };

export default function AddCard({ boardId }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const onAdd = () => {
    const t = title.trim();
    if (!t) return;
    dispatch(addCard({ boardId, name: t }));
    setTitle("");
    setOpen(false);
  };

  const onCancel = () => {
    setTitle("");
    setOpen(false);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") onAdd();
    else if (e.key === "Escape") onCancel();
  };

  if (!open) {
    return (
      <button className="board-action" onClick={() => setOpen(true)}>
        Add Another Card
      </button>
    );
  }

  return (
    <div className={"add-new-card"}>
      <input
        ref={inputRef}
        placeholder="Enter card title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className="actions">
        <button className="board-action add-btn" onClick={onAdd}>
          Add card
        </button>
        <button className="board-action cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
