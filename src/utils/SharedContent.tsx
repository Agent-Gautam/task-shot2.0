import {
  RiUserStarLine,
  HiOutlineAcademicCap,
  GiAutoRepair,
  FaHandHolding,
  LuRepeat,
  LuMonitorPlay,
  GoTrophy
} from "./reactIcons";

const categoryOptions = [
  { id: 0, icon: <RiUserStarLine size={20} />, text: "Skill" },
  { id: 1, icon: <GiAutoRepair size={20} />, text: "Maintenance" },
  { id: 2, icon: <HiOutlineAcademicCap size={20} />, text: "Academic" },
  { id: 3, icon: <FaHandHolding size={20} />, text: "Needs" },
  { id: 4, icon: <LuRepeat size={20} />, text: "Habit" },
  { id: 5, icon: <LuMonitorPlay size={20} />, text: "Entertainment" },
  { id: 6, icon: <GoTrophy size={20} />, text: "Competition" },
];

const priorityOptions = [
  { id: 0, colorClass: "bg-blue-200", text: "Low" },
  { id: 1, colorClass: "bg-orange-300", text: "Medium" },
  { id: 2, colorClass: "bg-red-400", text: "High" },
];

export { categoryOptions, priorityOptions};
