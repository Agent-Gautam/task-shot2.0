import { motion } from "motion/react";

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center h-full rounded-full">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon"
      >
        {/* Circles - Blinking Effect */}
        <motion.circle
          cx="12"
          cy="12"
          r="1"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.circle
          cx="12"
          cy="12"
          r="5"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.circle
          cx="12"
          cy="12"
          r="9"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.9,
            delay: 0.4,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        {/* Arrow - From Top Right */}
        <motion.path
          d="M15 6v3h3l3 -3h-3v-3z"
          initial={{ x: "100%", y: "-100%", opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.8,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.path
          d="M15 9l-3 3"
          initial={{ x: "100%", y: "-100%", opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.8,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </motion.svg>
    </div>
  );
};

export default LoadingAnimation;
