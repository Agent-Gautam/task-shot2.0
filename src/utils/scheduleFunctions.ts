import { Task } from "./types";

// **1. Sorting function:** Sort tasks into time-specific and non-time-specific categories.
export function timesort(tasksList: Task[]): [Task[], Task[]] {
  const timeSpecificTasks = tasksList.filter((task) => task.isTimeSpecific);
  const nonTimeSpecificTasks = tasksList.filter((task) => !task.isTimeSpecific);
  return [timeSpecificTasks, nonTimeSpecificTasks];
}

// **2. Compare dates:** Return the difference in minutes between a task's date-time and the current time.
function getMinutesDifference(task: Task): number {
  const currentDate = new Date();
  const taskDate = new Date(task.datetime);
  return (taskDate.getTime() - currentDate.getTime()) / (1000 * 60); // Convert milliseconds to minutes
}

// **3. Filter and sort tasks:** Filter tasks within a specific time range and sort them by date-time.
export function filterAndSortTasks(
  tasksList: Task[],
  timeRange: number
): Task[] {
  const filteredTasks = tasksList.filter(
    (task) =>
      task.isTimeSpecific &&
      getMinutesDifference(task) <= timeRange &&
      getMinutesDifference(task) >= -timeRange
  );
  return filteredTasks.sort(
    (task1, task2) =>
      new Date(task1.datetime).getTime() - new Date(task2.datetime).getTime()
  );
}

// **4. Choose by priority:** Select the highest-priority task. In case of ties, choose the earliest arrival time.
function chooseByPriority(tasks: Task[]): Task{

  const highestPriority = Math.min(...tasks.map((task) => task.priority));
  const priorityMatchedTasks = tasks.filter(
    (task) => task.priority === highestPriority
  );

  return priorityMatchedTasks.reduce((prevTask, currTask) =>
    currTask.createdAt < prevTask.createdAt ? currTask : prevTask
  );
}

// **5. Convert duration obj to minutes
function toMinutes(durationObj: {hour: number, min: number}): number {
  return durationObj.hour * 60 + durationObj.min;
}

// **6. Schedule a task:** Logic for choosing the most suitable task based on specific conditions.
export function scheduleTask(
  taskList: Task[],
  inputTime: Task['duration']
): Task|null{
  const [timeSpecificTasks, nonTimeSpecificTasks] = timesort(taskList);

  // Condition: If tasks are time-specific and within the next 5 minutes
  if (timeSpecificTasks.length > 0) {
    const nearestTasks = filterAndSortTasks(timeSpecificTasks, 6);
    if (nearestTasks.length > 0) {
      console.log("Chosen under near time");
      return nearestTasks[0];
    }
  }

  // Condition: Based on the input time
  if (inputTime) {
    const matchedTasks = taskList.filter((task) => {
      return Math.abs(toMinutes(inputTime) - toMinutes(task.duration)) < 6;
    });
    if (matchedTasks.length > 0) {
      console.log("Chosen under input time");
      return chooseByPriority(matchedTasks);
    }
  }

  // Condition: Choose by priority from non-time-specific tasks
  if (nonTimeSpecificTasks.length > 0) {
    console.log("Chosen by priority");
    return chooseByPriority(nonTimeSpecificTasks);
  }
  return null;
}

// **7. Check if a task is expired:** Determine if the task's duration has passed since its scheduled time.
export function isTaskExpired(
  scheduledTime: number,
  duration: string
): boolean {
  const [hours, minutes] = duration.split(":").map(Number);
  const durationInMilliseconds = (hours * 60 + minutes) * 60 * 1000;

  const taskEndTime = scheduledTime + durationInMilliseconds;
  const currentTime = Date.now();

  // Expired if the task's end time is more than 5 minutes before the current time
  return currentTime - taskEndTime >= 5 * 60 * 1000; // 5 minutes in milliseconds
}
