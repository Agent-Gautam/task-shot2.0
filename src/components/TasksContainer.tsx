import { Suspense, useContext, useMemo, useState } from "react";
import { Task } from "../utils/types";
import TasksList from "./TasksList";
import { TasksContext } from "../utils/TasksContext";
import SubTab from "./SubTab";

const TasksContainer = ({ tab }: { tab: number }) => {
  const [subTab, setSubTab] = useState(0);
  const context = useContext(TasksContext);
  const tasks = context?.tasks;
  const newTasks = useMemo(
    () => tasks?.filter((task: Task) => task.type === 0),
    [tasks]
  );
  const newTimelyTasks = useMemo(
    () => newTasks?.filter((task: Task) => task.isTimeSpecific),
    [newTasks]
  );
  const newNonTimelyTasks = useMemo(
    () => newTasks?.filter((task: Task) => !task.isTimeSpecific),
    [newTasks]
  );

  const pendingTasks = useMemo(
    () => tasks?.filter((task: Task) => task.type === 1),
    [tasks]
  );
  const pendingTimelyTasks = useMemo(
    () => pendingTasks?.filter((task: Task) => task.isTimeSpecific),
    [pendingTasks]
  );
  const pendingNonTimelyTasks = useMemo(
    () => pendingTasks?.filter((task: Task) => !task.isTimeSpecific),
    [pendingTasks]
  );

  const completedTasks = useMemo(
    () => tasks?.filter((task: Task) => task.type === 2),
    [tasks]
  );
  const completedTimelyTasks = useMemo(
    () => completedTasks?.filter((task: Task) => task.isTimeSpecific),
    [completedTasks]
  );
  const completedNonTimelyTasks = useMemo(
    () => completedTasks?.filter((task: Task) => !task.isTimeSpecific),
    [completedTasks]
  );

  console.log(tab);
  
  
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <SubTab subTab={subTab} changeTab={setSubTab} />
      <TasksList
        tasks={tab === 0 ? newTasks : tab === 1 ? pendingTasks : completedTasks}
      />
      <TasksList
        tasks={tab === 0 ? newTimelyTasks : tab === 1 ? pendingTimelyTasks : completedTimelyTasks}
      />
      <TasksList
        tasks={tab === 0 ? newNonTimelyTasks : tab === 1 ? pendingNonTimelyTasks : completedNonTimelyTasks}
      />
    </Suspense>
  );
};

export default TasksContainer;
