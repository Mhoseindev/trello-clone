"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/src/store/hooks";
import { addComment } from "@/src/store/boardsSlice";
import type { Comment } from "@/src/interfaces/boards";

type Props = {
  boardId: number;
  cardId: number;
  comments?: Comment[];
  onCloseAction: () => void;
  title?: string;
};

const Index = ({
  boardId,
  cardId,
  comments = [],
  onCloseAction,
  title,
}: Props) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");

  const onAdd = () => {
    const t = text.trim();
    if (!t) return;
    dispatch(addComment({ boardId, cardId, text: t }));
    setText("");
  };

  return (
    <div className="modal-backdrop" onClick={onCloseAction}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Comments for &quot;{title ?? "card"}&quot;</h3>
          <button className="modal-close" onClick={onCloseAction}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {comments.length === 0 ? (
            <div className="muted">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            <div className="comments-list">
              {comments.map((c) => (
                <div className="comment" key={c.id}>
                  <div className="comment-meta">
                    {c.author ?? ""}{" "}
                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                  </div>
                  <div className="comment-text">{c.text}</div>
                </div>
              ))}
            </div>
          )}

          <textarea
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onAdd}>
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
