import { LuLayoutList, LuListChecks, LuListX } from "react-icons/lu";
import {motion} from "motion/react"

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
    <nav className="w-full lg:mt-48 p-3">
      <ul className="w-full flex lg:flex-col lg:h-[200px] justify-between">
        {navlinks.map((obj) => (
          <motion.li
            layout
            key={obj.id}
            className={`w-[20%] lg:w-full p-1 lg:h-[50px] text-sm rounded-lg ${
              tab === obj.id ? "bg-secondary text-base flex-1 lg:flex-none" : "lg:bg-neutral shadow-inner"
            }`}
          >
            <button
              className="w-full h-full flex items-center px-3 py-1 lg:py-0 backdrop-blur-lg"
              onClick={() => setTab(obj.id)}
              title={obj.text}
            >
              <span
                className={`${tab == obj.id ? "text-base" : "text-accent"}`}
              >
                {obj.icon}
              </span>
              <span
                className={` ${
                  tab == obj.id ? "block text-base" : "hidden lg:block text-accent lg:text-black"
                } ml-2 `}
              >
                {obj.text}
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
