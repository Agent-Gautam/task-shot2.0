import { useState } from "react";
import { FaCaretDown, MdClose } from "../utils/reactIcons";
import { AnimatePresence, motion } from "motion/react";
import { Task } from "@/utils/types";

export default function Select({
  options,
  selectedItem,
  setItem,
  title,
}: {
  options: {
    icon: React.JSX.Element;
    text: string;
    id: number;
    tasks?: Task[]
  }[];
  selectedItem: number;
  setItem: Function;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      title={title}
      role="select"
      className={`relative rounded-lg cursor-pointer`}
    >
      <div className=" w-full text-secondary flex gap-1 divide-x rounded-full py-1 px-1 md:px-2 bg-base/50">
        <button
          className="rounded-l-full flex items-center gap-2"
          id="selected"
          onClick={() => setOpen(!open)}
        >
          <span className="scale-125">{options[selectedItem]?.icon}</span>
          <span className="hidden md:block">
            {selectedItem == -1 ? title : options[selectedItem].text}
          </span>
          {selectedItem == -1 ? (
            <span>{title}</span>
          ) : (
            <span className="hidden md:block">
              {options[selectedItem].text}
            </span>
          )}
          <FaCaretDown className={` ${open && "rotate-180 "}`} />
        </button>
        {selectedItem !== -1 && title !== "Tab" && (
          <button className="rounded-r-full" onClick={() => setItem(-1)}>
            <MdClose />
          </button>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className={`text-sm absolute left-0 top-[110%] flex flex-wrap gap-1 backdrop-blur-lg rounded-lg overflow-hidden z-50 `}
          >
            {options.map((opt, id) => (
              <button
                onClick={() => {
                  setItem(opt.id);
                  setOpen(false);
                }}
                key={`${title + id}`}
                title={opt.text}
                className="w-full flex items-center gap-2 hover:bg-neutral"
              >
                {opt.icon}
                <h1 className="text-xs">{opt.text}</h1>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
