"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/src/store/hooks";
import { addBoard } from "@/src/store/boardsSlice";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const onAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch(addBoard({ name: trimmed, cards: [] }));
    setTitle("");
    setOpen(false);
  };

  const onCancel = () => {
    setTitle("");
    setOpen(false);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      onAdd();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  if (!open) {
    return (
      <div className="add-board" onClick={() => setOpen(true)}>
        <button className="add-board-button">Add Another List</button>
      </div>
    );
  }

  return (
    <div className="board">
      <div className="body">
        <input
          ref={inputRef}
          placeholder="Enter a list title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={onKeyDown}
        />

        <div className="actions">
          <button className="board-action add-btn" onClick={onAdd}>
            Add list
          </button>
          <button className="board-action cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
