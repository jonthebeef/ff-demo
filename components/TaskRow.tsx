"use client";

import { useState } from "react";
import { Task } from "@/lib/types";

interface TaskRowProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export default function TaskRow({ task, onToggle, onUpdate, onDelete }: TaskRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editNotes, setEditNotes] = useState(task.notes || "");
  const [showNotes, setShowNotes] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleSave = () => {
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle && trimmedTitle.length <= 140) {
      onUpdate(task.id, {
        title: trimmedTitle,
        notes: editNotes.trim() || undefined,
        updatedAt: Date.now(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditNotes(task.notes || "");
    setIsEditing(false);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "just now";
  };

  if (isEditing) {
    return (
      <div
        style={{
          padding: "16px",
          backgroundColor: "#f8fafc",
          border: "2px solid #2563eb",
          borderRadius: "12px",
          marginBottom: "8px",
        }}
      >
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          maxLength={140}
          autoFocus
          style={{
            width: "100%",
            padding: "8px 12px",
            fontSize: "15px",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            marginBottom: "12px",
            outline: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
        />
        <textarea
          value={editNotes}
          onChange={(e) => setEditNotes(e.target.value)}
          placeholder="Add notes (optional)..."
          rows={3}
          style={{
            width: "100%",
            padding: "8px 12px",
            fontSize: "14px",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            marginBottom: "12px",
            outline: "none",
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button
            onClick={handleCancel}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              backgroundColor: "#ffffff",
              color: "#64748b",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!editTitle.trim() || editTitle.length > 140}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "600",
              backgroundColor: editTitle.trim() && editTitle.length <= 140 ? "#2563eb" : "#e2e8f0",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: editTitle.trim() && editTitle.length <= 140 ? "pointer" : "not-allowed",
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        marginBottom: "8px",
        transition: "all 0.2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.status === "done"}
          onChange={() => onToggle(task.id)}
          style={{
            width: "20px",
            height: "20px",
            marginTop: "2px",
            cursor: "pointer",
            accentColor: "#2563eb",
          }}
        />

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "15px",
              color: task.status === "done" ? "#94a3b8" : "#1e293b",
              textDecoration: task.status === "done" ? "line-through" : "none",
              marginBottom: "4px",
              wordBreak: "break-word",
            }}
          >
            {task.title}
          </div>

          {task.notes && (
            <button
              onClick={() => setShowNotes(!showNotes)}
              style={{
                fontSize: "13px",
                color: "#2563eb",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                marginBottom: "4px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>{showNotes ? "▼" : "▶"}</span>
              <span>Notes</span>
            </button>
          )}

          {showNotes && task.notes && (
            <div
              style={{
                fontSize: "14px",
                color: "#64748b",
                marginTop: "8px",
                paddingLeft: "12px",
                borderLeft: "2px solid #e2e8f0",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {task.notes}
            </div>
          )}

          <div
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              marginTop: "8px",
            }}
          >
            Updated {formatDate(task.updatedAt)}
          </div>
        </div>

        {/* Menu */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              padding: "4px 8px",
              fontSize: "18px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#64748b",
            }}
          >
            ⋮
          </button>

          {showMenu && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 10,
                minWidth: "120px",
              }}
            >
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowMenu(false);
                }}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  fontSize: "14px",
                  color: "#1e293b",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8fafc";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setShowMenu(false);
                }}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  fontSize: "14px",
                  color: "#ef4444",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  borderTop: "1px solid #f1f5f9",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#fef2f2";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
