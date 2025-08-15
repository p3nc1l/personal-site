"use client"

import { useState } from "react";
import { motion } from "motion/react";

const TypingIndicator = () => {
  const sleep = 0.5;

  return (
    <motion.span
      animate={{opacity: [0, 0, 1, 1]}}
      transition={{
        duration: sleep * 2,
        times: [0, 0.5, 0.5, 1],
        ease: "linear",
        repeat: Infinity
      }}
    >
      _
    </motion.span>
  )
}

const AnimatedTextContent = ({value, onCycleComplete}: {value: string, onCycleComplete?: () => void}) => {
  const lastIndex = value.length - 1;

  const [status, setStatus] = useState<"typing" | "clearing" | "complete" | "blank">("typing");

  const sleep = {
    typing: 0.2,
    blank: 1,
    complete: 3,
    clearing: 0.2
  }


  if (status == "typing") return (
    value.split("").map((char, index) => 
      <motion.span
        key={index}
        animate={{display: ["none", "none", "inline", "inline"]}}
        transition={{
          duration: sleep.typing * value.length,
          times: [0, index / lastIndex, index / lastIndex, 1],
          ease: "linear"
        }}
        onAnimationComplete={() => setStatus("complete")}
      >
        {char}
      </motion.span>
    )
  )
  else if (status == "clearing") return (
    value.split("").map((char, index) => 
    <motion.span
        key={index}
        animate={{display: ["inline", "inline", "none", "none"]}}
        transition={{
          duration: sleep.typing * value.length,
          times: [0, 1 - index / lastIndex, 1 - index / lastIndex, 1],
          ease: "linear"
        }}
        onAnimationComplete={() => setStatus("blank")}
      >
        {char}
      </motion.span>
    )
  )
  else if (status == "complete") return (
    <motion.span
      animate={{display: ["inline", "inline"]}}
      transition={{
          duration: sleep.complete,
          times: [0, 1],
          ease: "linear"
        }}
        onAnimationComplete={() => setStatus("clearing")}
    >
      {value}
    </motion.span>
  )
  else if (status == "blank") return (
    <motion.span
      animate={{display: ["none", "none"]}}
      transition={{
          duration: sleep.blank,
          times: [0, 1],
          ease: "linear"
        }}
        onAnimationComplete={() => {if (onCycleComplete) onCycleComplete(); setStatus("typing")}}
    >
      {value}
    </motion.span>
  )
}

export const AnimatedText = (props: {value: string[], textColor?: string}) => {
  const [valueIndex, setValueIndex] = useState(0);

  const NextValue = () => {
    if (valueIndex == props.value.length - 1) setValueIndex(0);
    else setValueIndex(index => index + 1);
  }

  return (
    <span>
      <span style={{color: props.textColor || "#fff"}}><AnimatedTextContent value={props.value[valueIndex]} onCycleComplete={NextValue} /></span>
      <TypingIndicator />
    </span>
  )
}

export default AnimatedText