"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";

const ImageButton = (props: {variant?: "previous" | "next", action?: () => void, disabled?: boolean}) => {
  return (
    <button className={`absolute top-[50%] ${props.variant == "previous" ? "left" : "right"}-4 -translate-y-1/2 ${props.disabled != true ? "cursor-pointer" : ""}`} disabled={props.disabled == true} onClick={props.action}>
      <div className="p-2 bg-black/30"><img width={30} className={props.variant == "previous" ? "rotate-180" : ""} src={"/right-arrow.svg"} alt="Previous image" /></div>
    </button>
  )
}

const ImageCarousel = (props: { imageUrls: string[], alt: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full relative overflow-hidden">
      <motion.div className={`flex relative`} style={{left: `${-100 * currentIndex}%`}} animate={{left: `${-100 * currentIndex}%`}}>
        {props.imageUrls.map((image, index) => 
          <div key={index} className="w-full aspect-video bg-neutral-700 shrink-0 relative">
            <Image fill src={image} alt={`${props.alt} #${index + 1}`} />
          </div>
        )}
      </motion.div>
      <ImageButton action={() => setCurrentIndex(index => index - 1)} variant="previous" disabled={currentIndex == 0} />
      <ImageButton action={() => setCurrentIndex(index => index + 1)} variant="next" disabled={currentIndex == props.imageUrls.length - 1} />
    </div>
  )
}

export default ImageCarousel