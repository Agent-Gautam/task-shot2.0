import { useMemo, useState } from "react";
import { Task } from "../utils/types";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import TaskShow from "./TaskShow";
import SubTabs from "./SubTabs";
import { AnimatePresence, motion } from "motion/react";
import NoTask from "./NoTask";
import {LuList, LuCalendarClock, LuCalendarOff} from "../utils/reactIcons"

const TasksContainer = ({ tasks }: { tasks: Task[] }) => {
  const [subTab, setSubTab] = useState(0);
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
    { id: 2, text: "Non-Timely", tasks: nonTimelyTasks,icon: <LuCalendarOff /> },
  ];

  return (
    <div className="w-full h-full flex flex-col flex-1 bg-base text-text">
      {/* Subtab Navigation */}
      {loaded && instanceRef.current && (
        <SubTabs
          changeSubTab={(tab: number) => instanceRef.current?.moveToIdx(tab)}
          subtabs={subtabs}
          selectedTab={subTab}
        />
      )}

      {/* Slider Sections */}
      <div
        id="desktop"
        className="w-full hidden lg:block columns-[300px] p-6 space-y-3 overflow-auto"
      >
        <AnimatePresence>
          {subtabs[subTab].tasks?.map((task, id) => (
            <TaskShow key={task.id} task={task} ind={id} />
          ))}
        </AnimatePresence>
      </div>
      <div id="mobile" className="flex-1 overflow-auto lg:hidden">
        <div ref={sliderRef} className="keen-slider">
          {subtabs.map((subtab, idx) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { staggerChildren: 0.9 } }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksContainer;
