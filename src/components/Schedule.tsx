import { useEffect, useMemo, useState } from "react";
import LoadingTask from "./LoadingTask";
import Notask from "./NoTask";
import {
  TiTick,
  MdDone,
  MdOutlineDoneOutline,
  MdOutlineFilterList,
  MdOutlineFilterListOff,
  FaSortUp,
  FaSortDown,
  FaChevronDown,
  FaChevronUp,
  FaRandom,
  MdClose,
  TbTargetArrow,
} from "../utils/reactIcons";
import Select from "./Select";
import DurationPicker from "./DurationPicker";
import { useTasksContext } from "@/utils/TasksContext";
import { scheduleTask } from "@/utils/scheduleFunctions";
import TaskShow from "./TaskShow";
import { categoryOptions, priorityOptions } from "@/utils/SharedContent";
import TasksContainer from "./TasksContainer";
import { Task } from "@/utils/types";

export default function Schedule({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const context = useTasksContext();
  const allTasks = context.tasks;
  const updateTask = context.updateTask;

  // Memoized list of tasks in scheduler
  const tasksInScheduler = useMemo<Task[]>(
    () => allTasks.filter((task) => task.inScheduleList),
    [allTasks]
  );

  const [scheduledTask, setScheduledTask] = useState<Task>();
  const [scheduleList, setScheduleList] = useState<Task[]>(tasksInScheduler);

  const [isSortOpen, setSortOpen] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    category: -1,
    priority: -1,
    sortBy: null as "duration" | "date" | null,
    sortOrder: null as "asc" | "desc" | null,
  });

  const [inputDuration, setInputDuration] = useState<Task["duration"]>({
    hour: 0,
    min: 0,
  });

  // Update scheduled task and schedule list when tasks change
  useEffect(() => {
    setScheduledTask(allTasks?.find((task) => task.isScheduled));
    setScheduleList(tasksInScheduler);
  }, [allTasks]);

  // Filter and sort tasks based on options
  useEffect(() => {
    let filteredTasks = [...tasksInScheduler];

    // Filter by category
    if (sortOptions.category !== -1) {
      filteredTasks = filteredTasks.filter(
        (task) => task.category === sortOptions.category
      );
    }

    // Filter by priority
    if (sortOptions.priority !== -1) {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === sortOptions.priority
      );
    }

    // Apply sorting
    if (sortOptions.sortBy) {
      filteredTasks.sort((a, b) => {
        if (sortOptions.sortBy === "duration") {
          // Correctly calculate duration in minutes
          const durationA =
            parseInt(a.duration.hour || "0") * 60 +
            parseInt(a.duration.min || "0");
          const durationB =
            parseInt(b.duration.hour || "0") * 60 +
            parseInt(b.duration.min || "0");
          return sortOptions.sortOrder === "asc"
            ? durationA - durationB
            : durationB - durationA;
        } else if (sortOptions.sortBy === "date") {
          // Ensure proper date parsing
          const dateA = new Date(a.datetime).getTime();
          const dateB = new Date(b.datetime).getTime();
          return sortOptions.sortOrder === "asc"
            ? dateA - dateB
            : dateB - dateA;
        }
        return 0;
      });
    }

    setScheduleList(filteredTasks);
  }, [sortOptions, tasksInScheduler]);

  // Handle filter changes for category and priority
  const handleFilterChange = (
    filterType: "category" | "priority",
    value: number
  ) => {
    setSortOptions((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Handle sort changes for duration and date
  const handleSortChange = (
    sortBy: "duration" | "date",
    sortOrder: "asc" | "desc"
  ) => {
    setSortOptions((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
    }));
  };

  // Randomize the schedule list
  function randomizeScheduleList() {
    const randomizedList = [...scheduleList].sort(() => Math.random() - 0.5);
    setScheduleList(randomizedList);
  }

  // Handle scheduling a task
  function handleShot() {
    let proposedTask: Task;
    if (
      (inputDuration.min !== 0 || inputDuration.hour !== 0) &&
      allTasks.length > 0
    ) {
      proposedTask = scheduleTask(allTasks, inputDuration);
    } else if (scheduleList.length > 0) {
      proposedTask = scheduleList[0];
    } else {
      alert("No task to schedule");
      return;
    }
    updateTask(proposedTask.id, { isScheduled: true });
  }

  // Toggle sort and reset options
  function handleToggleSort() {
    if (isSortOpen) {
      setSortOptions({
        category: -1,
        priority: -1,
        sortBy: null,
        sortOrder: null,
      });
    }
    setSortOpen(!isSortOpen);
  }

  return (
    <div
      id="scheduler"
      className={`absolute left-0 lg:static w-full bg-primary flex flex-col items-center rounded-b-xl p-2 shadow-xl ${
        isOpen ? "h-full top-0" : "h-[65px] top-[50px] lg:mb-[20px]"
      }`}
    >
      <div
        id="upper"
        className={`w-full flex justify-center items-center gap-5 mb-1 ${
          !isOpen ? "h-full" : "h-auto"
        }`}
      >
        {scheduledTask ? (
          isOpen ? (
            <TaskShow task={scheduledTask} />
          ) : (
            <div className="relative flex py-3 pr-4 pl-6 gap-2 items-center backdrop-blur-xl bg-white/30 rounded-md">
              <div
                id="priority"
                className={`absolute top-0 left-2 rounded-full w-2 h-full ${
                  priorityOptions[scheduledTask.priority].colorClass
                }`}
              />
              {categoryOptions[scheduledTask.category].icon}
              <p>{scheduledTask.description}</p>
            </div>
          )
        ) : (
          <div className="bg-white/40 px-4 py-3 w-60 rounded-xl">
            <DurationPicker
              duration={inputDuration}
              setDuration={setInputDuration}
            />
          </div>
        )}
        {scheduledTask ? (
          <div
            id="scheduledButtons"
            className={` flex ${
              !isOpen ? "flex-row w-24 " : "flex-col h-full"
            } justify-around`}
          >
            <button
              onClick={() =>
                updateTask(scheduledTask.id, {
                  isScheduled: false,
                  type: 2,
                  inScheduleList: false,
                })
              }
              className="rounded-lg bg-secondary text-base py-1 px-2"
            >
              <MdDone />
            </button>
            <button
              className="px-2 py-1 bg-accent text-white rounded-lg"
              onClick={() =>
                updateTask(scheduledTask.id, { isScheduled: false })
              }
            >
              <MdClose />
            </button>
          </div>
        ) : (
            <button
              className={`bg-accent text-secondary font-semibold text-lg py-2 px-3 rounded-lg flex items-center gap-5`}
              onClick={handleShot}
            >
              <TbTargetArrow size={20} />
              <p className={``}>Shot task</p>
            </button>
        )}
      </div>
      {isOpen && (
        <div
          id="filter-and-sort"
          className={`relative w-full flex justify-between gap-3 text-secondary ${
            isSortOpen && "sort-open"
          }`}
        >
          <button
            className="bg-tertiary p-3 rounded-lg"
            onClick={handleToggleSort}
            title="Filter and Sort"
          >
            {isSortOpen ? <MdOutlineFilterListOff /> : <MdOutlineFilterList />}
          </button>
          {isSortOpen && (
            <div
              className="absolute w-[180px] md:w-auto left-[40px] top-0 flex gap-2 overflow-y-visible bg-primary"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-1">
                <span>Duration</span>
                <section className="flex flex-col justify-center">
                  <FaSortUp
                    onClick={() => handleSortChange("duration", "asc")}
                    className="hover:bg-white/30"
                  />
                  <FaSortDown
                    onClick={() => handleSortChange("duration", "desc")}
                    className="hover:bg-white/30"
                  />
                </section>
              </div>
              <div className="flex items-center gap-1">
                <span>Date</span>
                <section className="flex flex-col justify-center">
                  <FaSortUp
                    onClick={() => handleSortChange("date", "asc")}
                    className="hover:bg-white/30"
                  />
                  <FaSortDown
                    onClick={() => handleSortChange("date", "desc")}
                    className="hover:bg-white/30"
                  />
                </section>
              </div>
              <Select
                key="category-select"
                options={categoryOptions}
                selectedItem={sortOptions.category}
                title="Category"
                setItem={(newCategory: number) =>
                  handleFilterChange("category", Number(newCategory))
                }
              />
              <Select
                key="priority-select"
                options={priorityOptions}
                selectedItem={sortOptions.priority}
                title="Priority"
                setItem={(newPriority: number) =>
                  handleFilterChange("priority", Number(newPriority))
                }
              />
            </div>
          )}
          <button
            id="randomizer"
            className={`bg-tertiary py-2 rounded-lg flex items-center p-2`}
            onClick={randomizeScheduleList}
          >
            <FaRandom />
          </button>
        </div>
      )}
      {isOpen && (
        <div className=" w-full h-[calc(100%-140px)] ">
          <TasksContainer tasks={scheduleList} />
        </div>
      )}
      <button
        className="px-1 z-40 bg-primary rounded-b-full"
        onClick={() => setOpen(!isOpen)}
      >
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
    </div>
  );
}
