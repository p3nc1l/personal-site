"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useDragControls, PanInfo } from "motion/react";

const ImageButton = (props: {variant?: "previous" | "next", action?: () => void, disabled?: boolean}) => {
  return (
    <button className={`absolute top-[50%] -translate-y-1/2 ${props.disabled != true ? "cursor-pointer" : ""}`} disabled={props.disabled == true} onClick={props.action} style={props.variant == "previous" ? {left: "10px"} : {right: "10px"}}>
      <div className="p-2 bg-black/30"><Image width={30} height={0} className={props.variant == "previous" ? "rotate-180" : ""} src={"/right-arrow.svg"} alt={props.variant == "previous" ? "Previous image" : "Next image"} /></div>
    </button>
  )
}

const ImageCarousel = (props: { imageUrls: string[], alt: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragControls = useDragControls();
  const imageDivRef = useRef<HTMLDivElement>(null);

  const CheckDragOffset = (info: PanInfo) => {
    if (imageDivRef.current == undefined) return;
    else if (info.offset.x > imageDivRef.current.getBoundingClientRect().width / 2 && currentIndex != 0) setCurrentIndex(index => index - 1);
    else if (info.offset.x < -1 * imageDivRef.current.getBoundingClientRect().width / 2 && currentIndex != props.imageUrls.length - 1) setCurrentIndex(index => index + 1);
  }

  return (
    <div className="w-full relative overflow-hidden">
      <motion.div 
        className={`flex relative`} 
        style={{left: `${-100 * currentIndex}%`}} 
        animate={{left: `${-100 * currentIndex}%`}}
        drag={"x"} 
        dragControls={dragControls}
        onDragEnd={(_, info) => CheckDragOffset(info)}
        dragConstraints={{left: 0, right: 0}}
        dragElastic={{left: currentIndex == props.imageUrls.length - 1 ? 0.001 : 1, right: currentIndex == 0 ? 0.001 : 1}}
      >
        {props.imageUrls[0] == undefined && 
          <div className="w-full aspect-video bg-neutral-700 shrink-0 relative flex items-center justify-center text-2xl">
            <span>No image</span>
          </div>
        }
        {props.imageUrls.map((image, index) => 
          <div key={index} className="w-full aspect-video bg-neutral-700 shrink-0 relative" ref={imageDivRef} >
            <Image className="object-contain" fill src={image} alt={`${props.alt} #${index + 1}`} onPointerDown={e => dragControls.start(e)} />
          </div>
        )}
      </motion.div>
      <ImageButton action={() => setCurrentIndex(index => index - 1)} variant="previous" disabled={currentIndex == 0} />
      <ImageButton action={() => setCurrentIndex(index => index + 1)} variant="next" disabled={currentIndex >= props.imageUrls.length - 1} />
    </div>
  )
}

export default ImageCarousel