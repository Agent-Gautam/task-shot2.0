import Navigation from "./Navigation";
import { BsSearch } from "react-icons/bs";
import { CgAddR } from "react-icons/cg";
const Header = ({tab, setTab, toggleSearch, toggleCreate}) => {
  return (
    <aside
      id="pane1"
      className="w-full lg:w-[20%] h-[170px] lg:h-full bg-base rounded-lg flex flex-col items-center lg:shadow-xl"
    >
      <header className="lg:relative w-full h-[50px] lg:h-auto flex lg:flex-col items-center justify-between mb-16 lg:mb-0 bg-primary p-4 ">
        <h1 className="text-semibold text-2xl">Task Scheduler</h1>
        <section
          id="action-buttons"
          className="flex lg:flex-col lg:w-full gap-2 lg:absolute  top-[110%]"
        >
          <button
            className="lg:w-full backdrop-blur-md rounded-md px-2 py-1 flex gap-2 lg:text-2xl lg:bg-white/30 text-secondary"
            onClick={() => toggleSearch()}
          >
            <BsSearch size={30} className="" />
            <p className="hidden lg:block">Search</p>
          </button>
          <button
            className="lg:w-full px-2 py-1 flex gap-2 lg:text-2xl backdrop-blur-lg rounded-md lg:bg-white/30 text-secondary"
            onClick={() => toggleCreate()}
          >
            <CgAddR size={30} className="text-secondary" />
            <p className="hidden lg:block">Add Task</p>
          </button>
        </section>
      </header>
      <Navigation setTab={setTab} tab={tab} />
    </aside>
  );
}

export default Header
