import { Task } from "@/utils/types";
import { ChangeEvent } from "react";
import { BsHourglassSplit } from "react-icons/bs";


const DurationPicker = ({ duration, setDuration }: {duration: Task['duration'], setDuration: Function}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setDuration({ ...duration, [name]: value });
    };
  return (
    <div
      className="w-full flex flex-row justify-between items-center"
      title="Duration of task"
    >
      <label htmlFor="dur" title="Duration">
        <BsHourglassSplit size={30} color="#355070ff" />
      </label>
      <div
        aria-labelledby="Duration"
        id="duration"
        className="relative flex flex-row items-center gap-3"
      >
        <div title="Hours" className="flex gap-1">
          <input
            type="number"
            name="hour"
            id="duration-hours"
            min={0}
            max={10}
            className="
              w-10 h-6 text-xs
             bg-slate-50 p-2 rounded-lg"
            value={duration.hour}
            onChange={handleChange}
          />
          <span className="text-md">h</span>
        </div>
        <span className="text-xl font-bold">:</span>
        <div title="Minutes" className="flex gap-1">
          <input
            type="number"
            name="min"
            id="duration-min"
            title="minutes"
            min={1}
            max={59}
            className="w-10 h-6 text-xs bg-slate-50 p-2 rounded-lg"
            value={duration.min}
            onChange={handleChange}
          />
          <span className="text-md">m</span>
        </div>
      </div>
    </div>
  );
};

export default DurationPicker;
