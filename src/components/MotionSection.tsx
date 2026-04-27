"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type MotionSectionProps = ComponentProps<typeof motion.div> & {
  delay?: number;
};

export function MotionSection({
  children,
  delay = 0,
  ...props
}: MotionSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
