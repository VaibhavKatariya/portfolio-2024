"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
  "Hi",
  "Hello",
  "こんにちは",
  "Bonjour",
  "Hola",
  "안녕하세요",
  "Ciao",
  "Hallo",
  "नमस्ते",
];

export default function DynamicGreetingWord() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === greetings.length - 1) {
          clearInterval(interval);
          setDone(true);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [done]);

  return (
    <div className="h-16 flex items-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl font-bold"
        >
          {greetings[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
