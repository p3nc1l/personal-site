"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"

type NavigationLink = {
  name: string,
  href: string
}

const navigationLinks: NavigationLink[] = [{
  name: "projects",
  href: "/projects"
}, {
  name: "about",
  href: "/about"
}, {
  name: "contact",
  href: "/contact"
}]

const headerStyle = "bg-white/85 text-black backdrop-blur-md";

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

const HeaderSidebar = (props: {visible?: boolean, close?: () => void}) => {
  const visible = props.visible || false;

  return (
    <AnimatePresence>
      {visible && <motion.div
        className={`absolute w-full h-screen sm:hidden ${headerStyle}`}
        initial={{x: "100vw"}}
        animate={{x: 0}}
        exit={{x: "100vw"}}
        transition={{type: "tween"}}
      >
        <div className={"flex flex-col w-full"}>
          {navigationLinks.map((link, index) => 
          <Link key={index} href={link.href} onClick={props.close}>
            <div className="w-full px-4 py-4 text-2xl">{link.name}</div>
          </Link>
          )}
        </div>
      </motion.div>}
    </AnimatePresence>
  )
}

const HeaderNavigation = () => {
  const pathname = usePathname();

  return (
    <div className={`flex gap-6`}>
      {navigationLinks.map((link, index) => <Link className={ `${pathname == link.href && "font-black"}`} key={index} href={link.href}>{link.name}</Link>)}
    </div>
  )
}

const Header = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <header className="sticky w-full top-0 z-1">
      <div className="w-full sm:p-2">
        <div className={`w-full px-6 sm:px-12 py-2 ${headerStyle} sm:rounded-xs flex justify-between items-center`}>
          <Link href={"/"} onClick={() => setSidebarVisible(false)}>
            <span className="font-bold text-2xl">David Szocs</span>
          </Link>
          <span className="hidden sm:inline"><HeaderNavigation /></span>
          <div className="block sm:hidden"><HeaderSidebarButton sidebarVisible={sidebarVisible} toggleSidebar={setSidebarVisible} /></div>
        </div>
      </div>
      <div className="relative">
        <HeaderSidebar visible={sidebarVisible} close={() => setSidebarVisible(false)} />
      </div>
    </header>
  )
}

export default Header;