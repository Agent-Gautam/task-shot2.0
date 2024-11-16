import firebase from "firebase/compat/app";

// Enum Definitions

// Task Category Enum
export enum TaskCategory {
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
  createdAt: firebase.firestore.Timestamp;
  description: string;
  duration: {
    hour: number;
    min: number;
  };
  category: TaskCategory;
  priority: TaskPriority;
  type: TaskType;
  datetime: firebase.firestore.Timestamp;
  isTimeSpecific: boolean;
  inScheduleList: boolean;
  isScheduled: boolean;
}