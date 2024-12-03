import { useMemo, useState } from "react";
import { Task } from "../utils/types";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import TaskShow from "./TaskShow";
import SubTabs from "./SubTabs";

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
    { id: 0, text: "All", tasks: allTasks },
    { id: 1, text: "Timely", tasks: timelyTasks },
    { id: 2, text: "Non-Timely", tasks: nonTimelyTasks },
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
        {subtabs[subTab].tasks?.map((task) => (
          <TaskShow task={task} />
        ))}
      </div>
      <div id="mobile" className="flex-1 overflow-auto lg:hidden">
        <div ref={sliderRef} className="keen-slider">
          {subtabs.map((subtab, idx) => (
            <div
              key={idx}
              className="keen-slider__slide h-full flex flex-col items-center gap-3 p-6"
            >
              {subtab.tasks?.map((task) => (
                  <TaskShow task={task} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksContainer;
