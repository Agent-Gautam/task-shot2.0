import React, { useEffect, useState } from "react";
import TasksContainer from "./components/TasksContainer";
import Header from "./components/Header";
import TasksProvider from "./utils/TasksContext";

const App: React.FC = () => {
  const [tab, setTab] = useState(0);
  return (
    <TasksProvider userId="123">
      <div className="text-blue-600 flex flex-col lg:flex-row">
        <Header tab={tab} setTab={setTab} />
        {/* <Scheduler /> */}
        <TasksContainer tab={tab} />
      </div>
    </TasksProvider>
    // <div>hello</div>
  );
};

export default App;
