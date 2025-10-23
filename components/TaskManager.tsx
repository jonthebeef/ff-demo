"use client";

import { useState, useEffect } from "react";
import { Task, FilterType, SortType } from "@/lib/types";
import { loadTasks, saveTasks, generateId } from "@/lib/storage";
import TaskInput from "./TaskInput";
import TaskRow from "./TaskRow";
import TaskControls from "./TaskControls";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("manual");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks on mount
  useEffect(() => {
    const loaded = loadTasks();
    setTasks(loaded);
    setIsLoaded(true);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveTasks(tasks);
    }
  }, [tasks, isLoaded]);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: generateId(),
      title,
      status: "todo",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "done" ? "todo" : "done",
              updatedAt: Date.now(),
            }
          : task
      )
    );
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAIReorder = () => {
    // Stub for AI reordering - just show a message for now
    alert(
      "AI Reordering is coming soon! This will intelligently sort your tasks by impact, urgency, and dependency."
    );

    // In the future, this will call an API endpoint
    // For now, we could do a simple shuffle or priority-based sort
  };

  const handleClearCompleted = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all completed tasks?"
    );
    if (confirmed) {
      setTasks(tasks.filter((task) => task.status !== "done"));
    }
  };

  // Filter tasks
  let filteredTasks = tasks;
  if (filter === "todo") {
    filteredTasks = tasks.filter((task) => task.status === "todo");
  } else if (filter === "done") {
    filteredTasks = tasks.filter((task) => task.status === "done");
  }

  // Sort tasks
  let sortedTasks = [...filteredTasks];
  if (sort === "newest") {
    sortedTasks.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sort === "oldest") {
    sortedTasks.sort((a, b) => a.createdAt - b.createdAt);
  }
  // manual = keep existing order

  const completedCount = tasks.filter((task) => task.status === "done").length;

  if (!isLoaded) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            color: "#94a3b8",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div>
      <TaskInput onAdd={handleAddTask} />

      {tasks.length > 0 && (
        <TaskControls
          filter={filter}
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onAIReorder={handleAIReorder}
          onClearCompleted={handleClearCompleted}
          completedCount={completedCount}
        />
      )}

      {sortedTasks.length === 0 ? (
        <div
          style={{
            padding: "60px 20px",
            textAlign: "center",
          }}
        >
          {tasks.length === 0 ? (
            <>
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "16px",
                }}
              >
                🚀
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#1e293b",
                  marginBottom: "8px",
                }}
              >
                Add your first to-do and focus on what moves the needle
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "#64748b",
                  maxWidth: "400px",
                  margin: "0 auto",
                  lineHeight: "1.6",
                }}
              >
                Start by adding a task above. Later, use AI to prioritize your list automatically.
              </p>
            </>
          ) : (
            <>
              <div
                style={{
                  fontSize: "32px",
                  marginBottom: "12px",
                }}
              >
                ✨
              </div>
              <p
                style={{
                  fontSize: "16px",
                  color: "#64748b",
                }}
              >
                No tasks match your current filter
              </p>
            </>
          )}
        </div>
      ) : (
        <div>
          {sortedTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}
