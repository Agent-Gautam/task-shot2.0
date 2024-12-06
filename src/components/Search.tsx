import { useState, useEffect } from "react";
import { useTasksContext } from "../utils/TasksContext";
import TasksContainer from "./TasksContainer";
import NoTask from "./NoTask";
import Select from "./Select";
import { Task } from "../utils/types";
import { categoryOptions, priorityOptions } from "@/utils/SharedContent";
import { MdClose, MdOutlineFilterList } from "../utils/reactIcons";
import { motion } from "motion/react";

export default function Search({ closeSearch }: { closeSearch: () => void }) {
  // State initialization
  const [searchInputs, setSearchInputs] = useState({
    searchTerm: "", // User's search term
    selectedCategory: -1, // No category selected
    selectedPriority: -1, // No priority selected
    isDescriptionOn: true,
    isDurationOn: true,
    isDateTimeOn: true,
  });
  const [isFilterMenuVisible, setFilterMenuVisible] = useState(true);
  const [searchedTasks, setSearchedTasks] = useState<Task[]>([]);

  const context = useTasksContext();
  const alltasks = context.tasks;

  // Effect to filter tasks based on search inputs
  useEffect(() => {
    const timeout = setTimeout(() => {
      const {
        searchTerm,
        selectedCategory,
        selectedPriority,
        isDescriptionOn,
        isDurationOn,
        isDateTimeOn,
      } = searchInputs;

      // Check if all search inputs are effectively "off"
      const noFiltersApplied =
        searchTerm === "" && selectedCategory === -1 && selectedPriority === -1;

      if (noFiltersApplied) {
        // Clear searched tasks if no filters are applied
        setSearchedTasks([]);
        return;
      }

      setSearchedTasks(
        alltasks.filter((task) => {
          const durationPattern = new RegExp(
            `^${task.duration.hour}h?\\s*[:\\s]?\\s*${task.duration.min}m?$`
          );
          const [fullDate, fullTime] = task.datetime.split("T");
          const [year, month, day] = fullDate ? fullDate.split("-") : [];
          const [hours, minutes] = fullTime ? fullTime.split(":") : [];
          const datePattern = `(${year})?(-${month})?(-${day})?`;
          const timePattern = `(${hours})?(:${minutes})?`;
          const dateTimePattern = new RegExp(
            `^(${datePattern})?(T${timePattern})?$`
          );

          const matchesCategory =
            selectedCategory === -1 || task.category === selectedCategory;
          const matchesPriority =
            selectedPriority === -1 || task.priority === selectedPriority;
          const matchesSearchTerm =
            searchTerm === "" ||
            (isDescriptionOn &&
              task.description
                .toLowerCase()
                .startsWith(searchTerm.toLowerCase())) ||
            (isDurationOn && durationPattern.test(searchTerm)) ||
            (isDateTimeOn && dateTimePattern.test(searchTerm));

          return matchesCategory && matchesPriority && matchesSearchTerm;
        })
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInputs, alltasks]);

  // Update search inputs state
  const handleSearchInput = (field: string, value: any) => {
    setSearchInputs((prev) => ({ ...prev, [field]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchInputs({
      searchTerm: "",
      selectedCategory: -1,
      selectedPriority: -1,
      isDescriptionOn: true,
      isDateTimeOn: true,
      isDurationOn: true,
    });
  };

  // Toggle filter menu visibility
  const toggleFilterMenu = () => {
    setFilterMenuVisible((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      exit={{opacity: 0}}
      className="absolute top-0 left-0 w-full backdrop-blur-xl h-full px-3 py-1 rounded-xl flex flex-col items-center z-50"
      onClick={() => closeSearch()}
    >
      <button className="place-self-start" onClick={closeSearch}>
        <MdClose size={30} />
      </button>
      <div
        className={`w-full lg:w-[60%] flex flex-col gap-2 bg-base/50 min-h-[500px] p-2 md:p-5 shadow-xl ${
          searchedTasks.length > 0 && "h-screen"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar and Filter Button */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            name="searchTerm"
            value={searchInputs.searchTerm}
            onChange={(e) => handleSearchInput("searchTerm", e.target.value)}
            className="p-2 border rounded-lg w-full bg-gray-50"
            placeholder=" Search tasks..."
          />
          <motion.button
            initial={{ boxShadow: "1px 2px black" }}
            whileTap={{boxShadow: "none", scale: 0.9}}
            className="p-2 bg-secondary text-white rounded-full shadow-2xl"
            onClick={toggleFilterMenu}
            title="Toggle Filters"
          >
            <MdOutlineFilterList size={24} />
          </motion.button>
        </div>

        {/* Filter Menu */}
        {isFilterMenuVisible && (
          <div className="p-4 bg-white rounded-lg shadow-md flex flex-col lg:flex-row flex-wrap gap-4">
            {/* Search in Section */}
            <p className="text-sm font-semibold text-gray-700">Search in:</p>
            <div className="flex gap-2 items-center">
              <button
                onClick={() =>
                  setSearchInputs((prev) => ({
                    ...prev,
                    isDescriptionOn: !prev.isDescriptionOn,
                  }))
                }
                className={`p-2 rounded-md text-white ${
                  searchInputs.isDescriptionOn
                    ? "bg-secondary scale-1"
                    : "bg-secondary/50 scale-90"
                }`}
              >
                Description
              </button>
              <button
                onClick={() =>
                  setSearchInputs((prev) => ({
                    ...prev,
                    isDurationOn: !prev.isDurationOn,
                  }))
                }
                className={`p-2 rounded-md text-white ${
                  searchInputs.isDurationOn ? "bg-secondary scale-1" : "bg-secondary/50 scale-90"
                }`}
              >
                Duration
              </button>
              <button
                onClick={() =>
                  setSearchInputs((prev) => ({
                    ...prev,
                    isDateTimeOn: !prev.isDateTimeOn,
                  }))
                }
                className={`p-2 rounded-md text-white ${
                  searchInputs.isDateTimeOn ? "bg-secondary scale-1" : "bg-secondary/50 scale-90"
                }`}
              >
                DateTime
              </button>
            </div>

            {/* Category and Priority */}
            <div className="flex gap-4">
              <Select
                options={categoryOptions}
                selectedItem={searchInputs.selectedCategory}
                title="Category"
                setItem={(newCategory: number) =>
                  handleSearchInput("selectedCategory", newCategory)
                }
              />
              <Select
                options={priorityOptions}
                selectedItem={searchInputs.selectedPriority}
                title="Priority"
                setItem={(newPriority: number) =>
                  handleSearchInput("selectedPriority", newPriority)
                }
              />
            </div>

            {/* Clear Filters Button */}
            <motion.button
              initial={{ scale: 1 }}
              whileTap={{scale: 1.2}}
              onClick={clearFilters}
              className="self-end p-2 bg-accent text-secondary rounded-xl flex items-center"
              title="Clear Filters"
            >
              <span><MdClose size={25} /></span>
              <h2 className="text-lg">Clear</h2>
            </motion.button>
          </div>
        )}

        {/* Search Results */}
        <div className="flex-1">
          {searchedTasks.length > 0 && <TasksContainer tasks={searchedTasks} />}
          {searchInputs.searchTerm !== "" && searchedTasks.length == 0 && (
            <NoTask />
          )}
        </div>
      </div>
    </motion.div>
  );
}
