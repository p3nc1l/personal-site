import { ReactNode } from "react";

const Card = (props: {children?: ReactNode}) => {
  return (
    <div className="w-full bg-neutral-800 border-neutral-600 border-1 rounded-sm p-2">
      {props.children}
    </div>
  )
}

export default Card;