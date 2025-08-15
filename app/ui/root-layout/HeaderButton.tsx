"use client";

import { motion } from "motion/react"
import { useState } from "react";

const HeaderButton = () => {
  const [variant, setVariant] = useState<"menu" | "close">("menu");

  const ChangeVariant = () => {
    if (variant == "menu") setVariant("close");
    else setVariant("menu");
  }

  return (
    <motion.div 
      className="w-[40] h-[40] relative cursor-pointer" 
      onClick={ChangeVariant}
      initial={variant}
      animate={variant}
      variants={{
        menu: {rotate: 0},
        close: {rotate: 90}
      }}
    >
      <motion.div
        className="absolute bg-black"
        initial={variant}
        animate={variant}
        variants={{
          menu: {y: 0, width: 40, height: 6},
          close: {rotate: -45, width: 50, height: 4, x: -5, y: 18}
        }}
      />
      <motion.div
        className="absolute bg-black"
        initial={variant}
        animate={variant}
        variants={{
          menu: {y: 10, width: 40, height: 6},
          close: {rotate: -45, width: 50, height: 4, x: -5, y: 18}
        }}
      />
      <motion.div
        className="absolute bg-black"
        initial={variant}
        animate={variant}
        variants={{
          menu: {y: 20, width: 40, height: 6},
          close: {rotate: 45, width: 50, height: 4, x: -5, y: 18}
        }}
      />
      <motion.div
        className="absolute bg-black"
        initial={variant}
        animate={variant}
        variants={{
          menu: {y: 30, width: 40, height: 6},
          close: {rotate: 45, width: 50, height: 4, x: -5, y: 18}
        }}
      />
    </motion.div>
  )
}

export default HeaderButton