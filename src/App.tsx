import React, { useState } from "react";
import Header from "./components/Header";
import {TasksProvider} from "./utils/TasksContext";
import TaskMaker from "./components/TaskMaker";
import Search from "./components/Search";
import AllTasks from "./components/AllTasks";
import Schedule from "./components/Schedule";

const App: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  return (
    <TasksProvider userId="user123">
      <div className="relative flex flex-col lg:flex-row w-full h-screen light lg:gap-5 lg:p-5 bg-base200">
        <Header
          tab={tab}
          setTab={setTab}
          toggleSearch={() => setSearchOpen(true)}
          toggleCreate={() => setCreateOpen(true)}
        />
        <div className="w-full lg:w-[60%] h-[calc(100%-170px)] lg:h-full flex flex-col">
          <Schedule isOpen={scheduleOpen} setOpen={setScheduleOpen} />
          {!scheduleOpen && <AllTasks tab={tab} />}
        </div>
        <div className=""></div>
        {createOpen && (
          <TaskMaker setOpen={() => setCreateOpen(false)} userId="user123" />
        )}
        {searchOpen && <Search closeSearch={() => setSearchOpen(false)} />}
      </div>
    </TasksProvider>
  );
};

export default App;
