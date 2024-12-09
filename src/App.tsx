import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { TasksProvider } from "./utils/TasksContext";
import TaskMaker from "./components/TaskMaker";
import Search from "./components/Search";
import AllTasks from "./components/AllTasks";
import Schedule from "./components/Schedule";
import { AnimatePresence } from "motion/react";
import Login from "./components/Login";
import { auth } from "./utils/firebase";
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";

const App: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    // Enable browserLocalPersistence globally
    setPersistence(auth, browserLocalPersistence).catch((error) =>
      console.error("Error enabling persistence:", error)
    );

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the user ID if logged in
        console.log(userId);
      } else {
        setUserId(""); // Clear user ID if logged out
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  return (
    <div
      className={`flex flex-col lg:flex-row w-full h-screen light lg:gap-5 lg:p-5 bg-base200`}
    >
      {!userId ? (
        <Login />
      ) : (
        <TasksProvider userId={userId}>
          <Header
            tab={tab}
            setTab={setTab}
            toggleSearch={() => setSearchOpen(true)}
            toggleCreate={() => setCreateOpen(true)}
          />
          <div
            className={`relative w-full lg:w-[60%] h-[calc(100%-170px)] lg:h-full flex flex-col lg:pt-[85px] pt-5 `}
          >
            <Schedule isOpen={scheduleOpen} setOpen={setScheduleOpen} />
            <AllTasks tab={tab} />
          </div>
          {/* <Profile user={userId} /> */}
          <AnimatePresence>
            {createOpen && (
              <TaskMaker setOpen={() => setCreateOpen(false)} userId={userId} />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {searchOpen && <Search closeSearch={() => setSearchOpen(false)} />}
          </AnimatePresence>
        </TasksProvider>
      )}
    </div>
  );
};

export default App;
