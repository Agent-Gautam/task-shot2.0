import { LuLayoutList, LuListChecks, LuListX } from "react-icons/lu";

const Navigation = ({
  tab,
  setTab,
}: {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const navlinks = [
    { id: 0, text: "New", icon: <LuLayoutList size={20} /> },
    { id: 1, text: "Pending", icon: <LuListX size={20} /> },
    { id: 2, text: "Completed", icon: <LuListChecks size={20} /> },
  ];
  return (
    <nav className="w-full md:mt-48">
      <ul className="w-full flex lg:flex-col lg:h-[220px] justify-between">
        {navlinks.map((obj) => (
          <li
            key={obj.id}
            className={`w-[20%] md:w-full p-1 md:h-[50px] text-sm border-2 border-gray-300 rounded-lg  md:text-background ${
              tab === obj.id &&
              "bg-secondary text-background md:bg-background md:text-secondary flex-1 md:flex-none"
            }`}
          >
            <button
              className="w-full h-full flex items-center px-3 py-1 md:py-0"
              onClick={() => setTab(obj.id)}
              title={obj.text}
            >
              {obj.icon}
              <span className={`hidden md:block ml-2`}>{obj.text}</span>
              {tab === obj.id && (
                <span className={`ml-2 md:hidden`}>{obj.text}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
