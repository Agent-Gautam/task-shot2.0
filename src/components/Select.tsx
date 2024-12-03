import { useState } from "react";
import { FaCaretDown, MdClose } from "../utils/reactIcons";

export default function Select({
  options,
  selectedItem,
  setItem,
  title,
}: {
  options: {
    icon?: React.JSX.Element;
    colorClass?: string;
    text: string;
    id: number;
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
      className={`w-full relative rounded-lg cursor-pointer`}
    >
      <div className="bg-white/50 w-full text-secondary flex rounded-full py-1 px-2">
        <button
          className=" rounded-l-full w-full"
          id="selected"
          onClick={() => setOpen(!open)}
        >
          <h1 className="rounded-lg flex items-center gap-2">
            {selectedItem == -1 ? (
              title
            ) : (
              <span className="flex gap-2 items-center">
                {options[selectedItem]?.icon} {options[selectedItem].text}
              </span>
            )}
            <FaCaretDown className={` ${open && "rotate-180 "}`} />
          </h1>
        </button>
        {selectedItem !== -1 && title !== "Tab" && (
          <button className="rounded-r-full" onClick={() => setItem(-1)}>
            <MdClose />
          </button>
        )}
      </div>
      <div
        className={`text-sm absolute left-0 top-[110%] flex flex-wrap gap-1 backdrop-blur-lg rounded-lg overflow-auto z-50 ${
          open ? "visible" : "hidden"
        } `}
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
            {title == "Priority" && (
              <div className={`w-3 h-3 rounded-full ${opt.colorClass}`} />
            )}
            {opt.icon}
            <h1 className="text-xs">{opt.text}</h1>
          </button>
        ))}
      </div>
    </div>
  );
}
