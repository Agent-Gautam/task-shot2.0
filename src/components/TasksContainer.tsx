import { Suspense, useContext, useMemo, useState } from "react";
import { Task } from "../utils/types";
import TasksList from "./TasksList";
import { TasksContext } from "../utils/TasksContext";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const TasksContainer = ({ tab }: { tab: number }) => {
  const [subTab, setSubTab] = useState(0);
  const context = useContext(TasksContext);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setSubTab(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
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

  const navlinks = ["All", "Timely", "Non Timely"];
  
  
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <div className="navigation-wrapper">
        {loaded && instanceRef.current && (
          <div className="w-full flex">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={
                    "w-full border-b rounded-md  " +
                    (subTab === idx ? "border-x border-b-0 border-t" : "")
                  }
                >
                  {navlinks[idx]}
                </button>
              );
            })}
          </div>
        )}
        <div ref={sliderRef} className="keen-slider">
          <TasksList
            tasks={
              tab === 0 ? newTasks : tab === 1 ? pendingTasks : completedTasks
            }
          />
          <TasksList
            tasks={
              tab === 0
                ? newTimelyTasks
                : tab === 1
                ? pendingTimelyTasks
                : completedTimelyTasks
            }
          />
          <TasksList
            tasks={
              tab === 0
                ? newNonTimelyTasks
                : tab === 1
                ? pendingNonTimelyTasks
                : completedNonTimelyTasks
            }
          />
        </div>
      </div>
    </Suspense>
  );
};

export default TasksContainer;
