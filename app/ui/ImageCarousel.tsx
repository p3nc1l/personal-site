"use client";

import Image from "next/image";

const ImageCarousel = (props: { imageUrls: string[], alt: string }) => {
  return (
    <div className="w-full relative overflow-hidden">
      <div className="flex">
        {props.imageUrls.map((image, index) => 
          <Image width={100000} height={0} src={image} key={index} alt={`${props.alt} #${index + 1}`} />
        )}
      </div>
    </div>
  )
}

export default ImageCarousel