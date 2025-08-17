"use client"

import AnimatedText from "./ui/AnimatedText";
import Tag from "./ui/Tag";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <section className="overflow-hidden relative">
      <motion.div 
        className="px-4 py-36 max-w-7xl mx-auto" 
        initial={{y: "100%"}} 
        whileInView={{y: 0}} 
        transition={{type: "tween"}}
      >
        <div className="text-7xl font-black mb-4">
          <div><AnimatedText textColor="oklch(62.3% 0.214 259.815)" value={["Front-end", "Back-end", "Full-stack"]} /></div>
          <div>Web Developer</div>
        </div>
        <div className="text-xl">Websites built on modern frameworks, with eye-catching, mobile-friendly UI.</div>
        <div className="flex flex-row gap-2 mt-1">
          <Tag hoverAnimation>Next.js</Tag>
          <Tag hoverAnimation>React</Tag>
          <Tag hoverAnimation>Vite</Tag>
        </div>
      </motion.div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-450px] rounded-full h-[400px] w-[400px] bg-white shadow-[0_0_160px_200px] shadow-white" />
    </section>
  )
}

export default Hero