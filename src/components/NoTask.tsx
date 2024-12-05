import { motion } from "motion/react";
const NoTask = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex items-center justify-center gap-3"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-slash-2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: "easeOut",
        }}
      >
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M22 2 2 22"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.3,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
      <motion.h1
        className="font-semibold md:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.7,
          ease: "easeOut",
        }}
      >
        List is Empty
      </motion.h1>
    </motion.div>
  );
}

export default NoTask
