"use client";

import { FilterType, SortType } from "@/lib/types";

interface TaskControlsProps {
  filter: FilterType;
  sort: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
  onAIReorder: () => void;
  onClearCompleted: () => void;
  completedCount: number;
}

export default function TaskControls({
  filter,
  sort,
  onFilterChange,
  onSortChange,
  onAIReorder,
  onClearCompleted,
  completedCount,
}: TaskControlsProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        marginBottom: "24px",
      }}
    >
      {/* Filter */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          Show:
        </span>
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value as FilterType)}
          style={{
            padding: "6px 12px",
            fontSize: "14px",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            backgroundColor: "#ffffff",
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="all">All</option>
          <option value="todo">To do</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Sort */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          Sort:
        </span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          style={{
            padding: "6px 12px",
            fontSize: "14px",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            backgroundColor: "#ffffff",
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="manual">Manual</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div style={{ flex: 1 }} />

      {/* AI Reorder Button */}
      <button
        onClick={onAIReorder}
        style={{
          padding: "8px 16px",
          fontSize: "14px",
          fontWeight: "600",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          transition: "all 0.2s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#1d4ed8";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#2563eb";
        }}
      >
        <span>✨</span>
        <span>Reorder with AI</span>
      </button>

      {/* Clear Completed */}
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: "600",
            backgroundColor: "#ffffff",
            color: "#64748b",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#f8fafc";
            e.currentTarget.style.color = "#ef4444";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#ffffff";
            e.currentTarget.style.color = "#64748b";
          }}
        >
          Clear {completedCount} completed
        </button>
      )}
    </div>
  );
}
