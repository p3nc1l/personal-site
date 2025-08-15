"use client";

import { ReactNode } from "react"
import { motion } from "motion/react"

const Tag = (props: {children: ReactNode, hoverAnimation?: boolean}) => {
  return (
    <motion.span
      className="bg-neutral-800 border-1 border-neutral-600 w-max py-0.5 px-2 rounded-full cursor-default"
      whileHover={{scale: props.hoverAnimation ? 1.1 : 1}}
    >
      {props.children}
    </motion.span>
  )
}

export default Tag