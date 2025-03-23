import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      {/* Logo Animation */}
      <motion.img
        src="/images/rydoLogo3.png" // Update this path
        alt="Logo"
        className="w-24 h-24 mb-13"
        initial={{ opacity: 1, scale: 1.2 }}
        animate={{ opacity: 1, scale: 2 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Spinner Animation */}
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Loading Text */}
      <motion.h2
        className="mt-4 text-2xl font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        Loading...
      </motion.h2>
    </div>
  );
};

export default LoadingScreen;
