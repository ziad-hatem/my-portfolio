import { Education, WorkExperience } from "@prisma/client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const StepComponent = ({
  showLine,
  data,
}: {
  showLine?: boolean;
  data?: Education | WorkExperience;
}) => {
  const [showMore, setShowMore] = useState(false);
  const formatDate = (date: any): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  return (
    <div className="flex items-start gap-2 relative mt-5">
      <div className="w-5 h-5 rounded-full bg-gray-700 mt-1 bg-opacity-50 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[#63E2B7] animate-pulse" />
      </div>
      <div className="text-white w-[50%] max-w-[300px]">
        <h1>{data?.title}</h1>
        <h3 className="text-sm text-muted-foreground">
          {formatDate(data?.startDate)} — {formatDate(data?.endDate)}
        </h3>
        <AnimatePresence>
          {showMore ? (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="break-normal text-gray-400"
            >
              {data?.description}
            </motion.p>
          ) : (
            <motion.p
              initial={{ height: "auto" }}
              animate={{ height: 20 }}
              className="break-normal text-gray-400 overflow-hidden"
            >
              {data?.description}
            </motion.p>
          )}
        </AnimatePresence>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-[#63E2B7] mt-2 text-sm hover:underline"
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>
      {showLine && (
        <div className="absolute left-[9px] top-6 bottom-0 w-px bg-gray-300 h-full"></div>
      )}
    </div>
  );
};

export default StepComponent;
