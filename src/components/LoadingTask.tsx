import { motion } from "motion/react";

const LoadingTask = () => {
  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }} // Moves left and fades out
      transition={{ duration: 0.5 }} // Smooth animation duration
    >
      <div className="break-inside-avoid relative w-full h-auto rounded-md p-3 pl-6 flex flex-col gap-3 min-h-[100px] max-w-[500px] bg-white/30 backdrop-blur-lg">
        <div
          className={`absolute left-2 top-0 w-2 h-full bg-primary/50 rounded-full animate-pulse`}
        />
        <div id="upper-row" className="w-full flex flex-col gap-1">
          <p className="w-[80%] h-4 bg-secondary/50 rounded-full animate-pulse"></p>
          <p className="h-5 bg-secondary/50 rounded-full w-[50%] animate-pulse"></p>
        </div>
        <div id="lower-row" className="flex justify-between items-center">
          <div id="left" className="flex gap-2 items-center">
            <h1 className="w-6 h-6 rounded-full bg-secondary/50 animate-pulse"></h1>
            <div className="bg-secondary/50 w-24 h-8 rounded-lg py-1 px-3 flex animate-pulse"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingTask;
