"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedOrbs() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <>
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-600/10 blur-3xl" />
      </>
    );
  }

  return (
    <>
      <motion.div
        className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-600/10 blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </>
  );
}
