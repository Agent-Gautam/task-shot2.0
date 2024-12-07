import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { newTask, Task } from "./types.ts";
import { base, tasksCol } from "./firebase.ts";

// async function createMany() {
//   mocktasks.forEach(async (task: Task) => {
//     await addDoc(tasksCol, task);
//     console.log("created : ", task.description);
//   });
// }

//check validation in frontend
async function CreateTask(task: newTask) {
  try {
    const newTaskRef = await addDoc(tasksCol, task,);
    console.log("Task created successfully");
    return newTaskRef.id;
  } catch (error) {
    console.error("Error creating the task", error);
  }
}

async function DeleteTask(taskId: Task["id"]): Promise<boolean> {
  try {
    const taskRef = doc(base, "tasks", taskId);
    await deleteDoc(taskRef);
    return true;
  } catch (error) {
    console.error("Error deleting task", error);
    return false;
  }
}

async function EditTask(
  taskId: Task["id"],
  modifiedProperties: Partial<Task>
): Promise<boolean> {
  console.log(taskId)
  try {
    const taskRef = doc(base, "tasks", taskId);
    await updateDoc(taskRef, modifiedProperties);
    console.log("Task updated");
    return true;
  } catch (error) {
    console.error("Error updating task:", error);
    return false;
  }
}

async function FetchTasks(userId: Task["userId"]) {
  try {
    const q = query(tasksCol, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const fetchedTasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
    return fetchedTasks;
  } catch (error) {
    console.log("Error fetching tasks:", error);
    return [];
  }
}

//function will be modify for pagination
async function FetchScheduleList(userId: Task["userId"]): Promise<Task[]> {
  try {
    const q = query(
      tasksCol,
      where("userId", "==", userId),
      where("inScheduleList", "==", true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
  } catch (error) {
    console.error("Error fetching schedule list:", error);
    return [];
  }
}

//fetch Scheduled task
async function FetchScheduled(userId: Task["userId"]): Promise<Task | null> {
  try {
    const q = query(
      tasksCol,
      where("userId", "==", userId),
      where("type", "in", [0, 1]),
      where("isScheduled", "==", true),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const fetchedDoc = snapshot.docs[0];
      return { id: fetchedDoc.id, ...fetchedDoc.data() } as Task;
    } else {
      console.log("No scheduled task found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching scheduled task:", error);
    return null;
  }
}

export {
  CreateTask,
  DeleteTask,
  EditTask,
  FetchTasks,
  FetchScheduleList,
  FetchScheduled,
};
