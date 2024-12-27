import { Task } from "@/utils/types";
import Select from "./Select";

const SubTabs = ({
  changeSubTab,
  subtabs,
  selectedTab,
}: {
  changeSubTab: Function;
  subtabs: {
    id: number;
    text: string;
    icon: React.JSX.Element;
    tasks: Task[];
  }[];
  selectedTab: number;
  }) => {
  return (
    <div className="">
      <div
        id="mobileView"
        className="lg:hidden w-full top-0 flex justify-evenly "
      >
        {subtabs.map((subtab, idx) => (
          <button
            key={idx}
            onClick={() => changeSubTab(idx)}
            className={`flex-1 text-center p-1`}
          >
            <h1
              className={`${
                selectedTab === idx && "bg-white/50 font-semibold"
              } rounded-lg`}
            >
              {subtab.text}
            </h1>
          </button>
        ))}
      </div>
      <div className="hidden lg:block">
        <Select
          options={subtabs}
          selectedItem={selectedTab}
          setItem={(item: number) => changeSubTab(item)}
          title="Tab"
          key={"subtabs"}
        />
      </div>
    </div>
  );
};

export default SubTabs;
