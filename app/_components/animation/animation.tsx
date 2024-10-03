import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useContextProvider } from "../providers/context-provider";
import { navData } from "../info-navigation";
import { useEffect } from "react";

const Animation = ({ children }: { children: React.ReactNode }) => {
  const { active, animateExitDirection, animateEnterDirection } =
    useContextProvider();

  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        custom={animateExitDirection}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Animation;
