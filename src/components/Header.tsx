import Navigation from "./Navigation";
const Header = ({tab, setTab}) => {
  return (
    <aside
      id="pane1"
      className="w-full lg:w-[20%] h-full p-4 rounded-lg flex flex-col items-center bg-secondary"
    >
      <header className="w-full h-[50px] flex items-center justify-center mb-24 lg:mb-0">
        <h1 className="text-semibold text-2xl">Task Scheduler</h1>
        {/* <Search /> */}
        {/* <AddTask /> */}
      </header>
      <Navigation setTab={setTab} tab={tab} />
    </aside>
  );
}

export default Header
