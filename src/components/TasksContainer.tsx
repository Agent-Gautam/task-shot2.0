import { useMemo, useState } from "react";
import { Task } from "../utils/types";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import TaskShow from "./TaskShow";
import SubTabs from "./SubTabs";
import { AnimatePresence } from "motion/react";
import NoTask from "./NoTask";
import { LuList, LuCalendarClock, LuCalendarOff } from "../utils/reactIcons";
import { useTasksContext } from "@/providers/TasksContext";
import LoadingTask from "./LoadingTask";

const TasksContainer = ({ tasks }: { tasks: Task[] }) => {
  const [subTab, setSubTab] = useState(0);

  const { loading } = useTasksContext();

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setSubTab(slider.track.details.rel);
    },
    created() {
    },
  });

  // Divide tasks into subtabs
  const allTasks = tasks;
  const timelyTasks = useMemo(
    () => tasks.filter((task) => task.isTimeSpecific),
    [tasks]
  );
  const nonTimelyTasks = useMemo(
    () => tasks.filter((task) => !task.isTimeSpecific),
    [tasks]
  );

  const subtabs = [
    { id: 0, text: "All", tasks: allTasks, icon: <LuList /> },
    { id: 1, text: "Timely", tasks: timelyTasks, icon: <LuCalendarClock /> },
    {
      id: 2,
      text: "Non-Timely",
      tasks: nonTimelyTasks,
      icon: <LuCalendarOff />,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col flex-1 bg-base text-text">
      {/* Subtab Navigation */}
      {!loading  && (
        <SubTabs
          changeSubTab={(tab: number) => instanceRef.current?.moveToIdx(tab)}
          subtabs={subtabs}
          selectedTab={subTab}
        />
      )}

      {loading ? (
        <div className="columns-[300px] space-y-3 p-6">
          {Array.from({ length: 5 }).map(() => (
            <LoadingTask />
          ))}
        </div>
      ) : (
        <>
          <div
            id="desktop"
            className="w-full hidden lg:block columns-[300px] p-6 space-y-3 overflow-auto bg-red"
          >
            <AnimatePresence>
              {subtabs[subTab].tasks.length > 0 ? (
                subtabs[subTab].tasks.map((task, id) => (
                  <TaskShow key={task.id} task={task} ind={id} />
                ))
              ) : (
                <NoTask />
              )}
            </AnimatePresence>
          </div>
          {/* Slider Section */}
          <div id="mobile" className="flex-1 overflow-auto lg:hidden">
            <div ref={sliderRef} className="keen-slider">
              {subtabs.map((subtab, idx) => (
                <div
                  key={idx}
                  className="keen-slider__slide h-full flex flex-col items-center gap-3 p-6"
                >
                  <AnimatePresence>
                    {subtab.tasks.length > 0 ? (
                      subtab.tasks.map((task, id) => (
                        <TaskShow key={task.id} ind={id} task={task} />
                      ))
                    ) : (
                      <NoTask />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TasksContainer;
