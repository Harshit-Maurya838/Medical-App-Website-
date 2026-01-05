import { motion } from "framer-motion";

export default function GradientButton({ children, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="w-full py-3 rounded-xl font-semibold
                 bg-linear-to-r from-[var(--primary) to-[var(--accent)
                 shadow-lg"
    >
      {children}
    </motion.button>
  );
}
