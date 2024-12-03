import { PiEmptyBold } from "../utils/reactIcons";

const NoTask = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-3">
      <PiEmptyBold size={30} />
      <h1 className="font-semibold md:text-lg">List is Empty</h1>
    </div>
  );
}

export default NoTask
