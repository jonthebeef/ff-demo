"use client";

import { useState, KeyboardEvent } from "react";

interface TaskInputProps {
  onAdd: (title: string) => void;
}

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    const trimmed = title.trim();
    if (trimmed && trimmed.length <= 140) {
      onAdd(trimmed);
      setTitle("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task..."
        maxLength={140}
        style={{
          flex: 1,
          padding: "12px 16px",
          fontSize: "15px",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#2563eb";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e2e8f0";
        }}
      />
      <button
        onClick={handleAdd}
        disabled={!title.trim() || title.length > 140}
        style={{
          padding: "12px 24px",
          fontSize: "15px",
          fontWeight: "600",
          backgroundColor: title.trim() && title.length <= 140 ? "#2563eb" : "#e2e8f0",
          color: title.trim() && title.length <= 140 ? "white" : "#94a3b8",
          border: "none",
          borderRadius: "8px",
          cursor: title.trim() && title.length <= 140 ? "pointer" : "not-allowed",
          transition: "all 0.2s",
        }}
        onMouseOver={(e) => {
          if (title.trim() && title.length <= 140) {
            e.currentTarget.style.backgroundColor = "#1d4ed8";
          }
        }}
        onMouseOut={(e) => {
          if (title.trim() && title.length <= 140) {
            e.currentTarget.style.backgroundColor = "#2563eb";
          }
        }}
      >
        Add
      </button>
    </div>
  );
}
