"use client"

import { motion } from "motion/react"

const Spinner = () => {
  return (
    <motion.span 
      className="inline-block rounded-full aspect-square w-[1.66em] border-[0.33em] border-black/60 border-r-black"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, ease: "linear" }}
    />
  )
}

export default Spinner