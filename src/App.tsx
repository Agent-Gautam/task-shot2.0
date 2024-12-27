import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { TasksProvider } from "./providers/TasksContext";
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
import { TaskMakerProvider } from "./providers/TaskEditorContext";

const Loading: React.FC = () => (
  <div className="flex items-center justify-center w-full h-screen bg-gray-200">
    <h1 className="text-xl font-bold">Loading...</h1>
  </div>
);

const App: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Enable browserLocalPersistence globally
        await setPersistence(auth, browserLocalPersistence);

        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserId(user.uid); // Set the user ID if logged in
          } else {
            setUserId(""); // Clear user ID if logged out
          }
          setIsLoading(false); // Mark as no longer loading
        });

        return () => unsubscribe(); // Clean up listener on unmount
      } catch (error) {
        console.error("Error initializing authentication:", error);
        setIsLoading(false); // Ensure loading ends even on error
      }
    };

    initializeAuth();
  }, []);

  return (
    <div
      className={`flex flex-col lg:flex-row w-full h-screen light lg:gap-5 lg:p-5 bg-base200 select-none`}
    >
      {!userId ? (
        <Login isLoading={isLoading} />
      ) : (
        <TasksProvider userId={userId}>
          <TaskMakerProvider>
            <Header
              tab={tab}
              setTab={setTab}
              toggleSearch={() => setSearchOpen(true)}
            />
            <div
              id="main-content"
              className={`relative w-full lg:w-[60%] h-[calc(100%-170px)] lg:h-full flex flex-col lg:pt-[85px] pt-5`}
            >
              <Schedule isOpen={scheduleOpen} setOpen={setScheduleOpen} />
              <AllTasks tab={tab} />
            </div>
            <AnimatePresence>
              <TaskMaker userId={userId} />
            </AnimatePresence>
            <AnimatePresence>
              {searchOpen && (
                <Search closeSearch={() => setSearchOpen(false)} />
              )}
            </AnimatePresence>
          </TaskMakerProvider>
        </TasksProvider>
      )}
    </div>
  );
};

export default App;
