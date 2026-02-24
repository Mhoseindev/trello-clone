"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  boardId: number;
  onDeleteAllCardsAction: (boardId: number) => void;
  onDeleteBoardAction: (boardId: number) => void;
};

export default function ListActions({
  boardId,
  onDeleteAllCardsAction,
  onDeleteBoardAction,
}: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        btnRef.current &&
        !btnRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleDeleteAll = () => {
    setOpen(false);
    onDeleteAllCardsAction(boardId);
  };

  const handleDeleteBoard = () => {
    setOpen(false);
    onDeleteBoardAction(boardId);
  };

  return (
    <div className="list-actions">
      <button
        ref={btnRef}
        className="list-actions-button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        title="List actions"
      >
        <svg
          width="16"
          height="4"
          viewBox="0 0 16 4"
          fill="currentColor"
          aria-hidden
        >
          <circle cx="2" cy="2" r="2" />
          <circle cx="8" cy="2" r="2" />
          <circle cx="14" cy="2" r="2" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          className="list-actions-menu"
          role="menu"
          aria-label="List actions"
        >
          <div className="menu-title">List Actions</div>
          <button
            className="menu-action delete-list"
            onClick={handleDeleteBoard}
            role="menuitem"
          >
            Delete List
          </button>
          <button
            className="menu-action delete-all"
            onClick={handleDeleteAll}
            role="menuitem"
          >
            Delete All Cards
          </button>
        </div>
      )}
    </div>
  );
}
