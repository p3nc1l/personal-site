"use client";

import { motion } from "motion/react"

const IconPath = (props: {variant?: "menu" | "close", closeOrientation?: "left" | "right", menuHeight?: number}) => {
  const variant = props.variant || "menu";
  const closeOrientation = props.closeOrientation || "left";
  const menuHeight = props.menuHeight || 0;

  return (
    <motion.line
      className={"stroke-black"}
      variants={{
        menu: { x1: 0, y1: menuHeight, x2: 30, y2: menuHeight, strokeWidth: 4 },
        close: { x1: 1, y1: closeOrientation == "right" ? 24 : 1, x2: 24, y2: closeOrientation == "right" ? 1 : 24, strokeWidth: 3 }
      }}
      animate={variant}
    />
  )
}

const HeaderSidebarButton = (props: {toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>, sidebarVisible: boolean}) => {
  const variant = props.sidebarVisible ? "close" : "menu";

  const ChangeVariant = () => {
    props.toggleSidebar(current => !current)
  }

  return (
    <form action={ChangeVariant} className="flex">
      <button type="submit">
        <motion.svg 
          width={25} 
          height={25} 
          className={"cursor-pointer"}
          variants={{
            menu: {rotate: 0},
            close: {rotate: 90}
          }}
          animate={variant}
        >
          <IconPath variant={variant} closeOrientation="right" menuHeight={2} />
          <IconPath variant={variant} closeOrientation="right" menuHeight={9} />
          <IconPath variant={variant} closeOrientation="left" menuHeight={16} />
          <IconPath variant={variant} closeOrientation="left" menuHeight={23} />
        </motion.svg>
      </button>
    </form>
  )
}

export default HeaderSidebarButton