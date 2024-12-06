// Enum Definitions

import { Timestamp } from "firebase/firestore";

// Task Category Enum
export enum TaskCategory {
  NotSelected = -1,
  SKILL = 0,
  MAINTENANCE = 1,
  ACADEMIC = 2,
  NEEDS = 3,
  HABIT = 4,
  ENTERTAINMENT = 5,
  COMPETITION = 6,
}

// Task Priority Enum
export enum TaskPriority {
  NotSelected = -1,
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

export enum TaskType {
  NEW = 0,
  PENDING = 1,
  COMPLETED = 2
}

// Task Interface

export interface Task {
  userId: string; // Firestore document ID of the user
  id: string; // Firestore document ID of the task
  createdAt: Timestamp;
  description: string;
  duration: {
    hour: number;
    min: number;
  };
  category: TaskCategory;
  priority: TaskPriority;
  type: TaskType;
  datetime: string;
  isTimeSpecific: boolean;
  inScheduleList: boolean;
  isScheduled: boolean;
}

export type newTask = Omit<Task,'id'>
