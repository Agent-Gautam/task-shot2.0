import Navigation from "./Navigation";
import { BsSearch } from "react-icons/bs";
import { CgAddR } from "react-icons/cg";
import { LiaSignOutAltSolid } from "../utils/reactIcons";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useTaskMaker } from "@/providers/TaskEditorContext";
const Header = ({
  tab,
  setTab,
  toggleSearch,
}: {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
  toggleSearch: Function;
  }) => {
  const { openTaskMaker } = useTaskMaker();
    const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const LogOutButton = (
    <button
      className="lg:w-full backdrop-blur-md rounded-md px-2 py-1 flex items-center gap-2 lg:text-2xl lg:bg-white/30 text-secondary"
      onClick={handleSignOut}
    >
      <LiaSignOutAltSolid size={30} />
      <p className="hidden lg:block">LogOut</p>
    </button>
  );
  return (
    <aside
      id="pane1"
      className="relative w-full lg:w-[20%] h-[170px] lg:h-full bg-base rounded-lg flex flex-col items-center lg:shadow-xl"
    >
      <header className="lg:relative w-full h-[50px] lg:h-auto flex lg:flex-col items-center justify-between mb-[64px] lg:mb-0 bg-primary px-4 lg:py-4">
        <h1 className="text-semibold text-2xl ">Task Scheduler</h1>
        <section
          id="action-buttons"
          className="flex lg:flex-col lg:w-full gap-2 lg:absolute  top-[110%]"
        >
          <button
            className="lg:w-full backdrop-blur-md rounded-md px-2 py-1 flex items-center gap-2 lg:text-2xl lg:bg-white/30 text-secondary"
            onClick={() => toggleSearch()}
          >
            <BsSearch size={30} className="" />
            <p className="hidden lg:block">Search</p>
          </button>
          <button
            className="lg:w-full px-2 py-1 flex items-center gap-2 lg:text-2xl backdrop-blur-lg rounded-md lg:bg-white/30 text-secondary"
            onClick={() => openTaskMaker(null, 'create')}
          >
            <CgAddR size={30} className="text-secondary" />
            <p className="hidden lg:block">Add Task</p>
          </button>
          <div className="lg:hidden">{LogOutButton}</div>
        </section>
      </header>
      <Navigation setTab={setTab} tab={tab} />
      <div className="hidden absolute bottom-0 lg:block w-full self-end">
        {LogOutButton}
      </div>
    </aside>
  );
};

export default Header
