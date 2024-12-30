import React from "react";
import { FaMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

interface ThemeToggleProps {
  theme: string;
  toggleTheme: Function;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {

  return (
    <div className="w-full flex items-center justify-between gap-3">
      {/* sun icon */}
      <MdWbSunny size={40} className="text-accent" />
      <div className="relative flex w-full bg-base rounded-full px-3 py-1">
        <button
          className="flex-1 rounded-full text-white"
          onClick={() => toggleTheme("light")}
        >
          Light
        </button>
        <span
          className={`absolute top-0 left-1 bg-gray-400 text-white w-[50%]  h-full flex items-center justify-center rounded-2xl ${
            theme == "dark" ? "translate-x-[100%]" : "translate-x-0"
          }`}
        >
          {theme == "light" ? "Light" : "Dark"}{" "}
        </span>
        <button
          className="flex-1 rounded-full"
          onClick={() => toggleTheme("dark")}
        >
          Dark
        </button>
      </div>
      {/* moon icon */}
      <FaMoon size={40} className={`${theme === "light" ? "text-secondary" : "text-white"} `} />
    </div>
  );
};

export default ThemeToggle;
