// TaskMakerContext.tsx
import React, { createContext, useContext, useState } from "react";

type TaskMakerContextType = {
  isOpen: boolean;
  taskInitials: any;
  mode: "create" | "update";
  openTaskMaker: (taskInitials?: any, mode?: "create" | "update") => void;
  closeTaskMaker: () => void;
};

const TaskMakerContext = createContext<TaskMakerContextType | undefined>(
  undefined
);

export const TaskMakerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskInitials, setTaskInitials] = useState<any>(null);
  const [mode, setMode] = useState<"create" | "update">("create");

  const openTaskMaker = (
    initials = null,
    mode: "create" | "update" = "create"
  ) => {
    setTaskInitials(initials);
    setMode(mode);
    setIsOpen(true);
  };

  const closeTaskMaker = () => {
    setIsOpen(false);
    setTaskInitials(null);
  };

  return (
    <TaskMakerContext.Provider
      value={{ isOpen, taskInitials, mode, openTaskMaker, closeTaskMaker }}
    >
      {children}
    </TaskMakerContext.Provider>
  );
};

export const useTaskMaker = () => {
  const context = useContext(TaskMakerContext);
  if (!context)
    throw new Error("useTaskMaker must be used within a TaskMakerProvider");
  return context;
};
