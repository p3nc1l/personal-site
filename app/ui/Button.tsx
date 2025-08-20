"use client";

import { ReactNode } from "react"
import { motion } from "motion/react";

const Button = (props: { children?: ReactNode, size?: "small" | "normal" | "large", fullWidth?: boolean }) => {
  const padding = props.size == "small" ? "0.25em" : props.size == "large" ? "1em" : "0.5em";

  return (
    <motion.span 
      className={`cursor-pointer bg-white text-black rounded-sm font-bold text-center inline-block`} 
      style={{ padding: padding, width: props.fullWidth ? "100%" : "max-content" }}
      whileHover={{ backgroundColor: "#d4d4d4" }}
      whileTap={{ backgroundColor: "#aaaaaa" }}
    >
      {props.children}
    </motion.span>
  )
}

export default Button