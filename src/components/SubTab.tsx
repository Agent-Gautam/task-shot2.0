import React from 'react'

const SubTab = ({
  subTab,
  changeTab,
}: {
  subTab: number;
  changeTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="w-full flex">
      {["All", "Timely", "Non Timely"].map((value, ind) => (
        <button
          className={`border-b w-full rounded-md ${
            subTab == ind && "border-x border-b-0 border-t"
          }`}
          onClick={() => changeTab(ind)}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default SubTab
