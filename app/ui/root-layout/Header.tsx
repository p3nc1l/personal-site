"use client"

import Link from "next/link"
import HeaderNavigation from "./HeaderNavigation"
import HeaderSidebarButton from "./HeaderSidebarButton"
import HeaderSidebar from "./HeaderSidebar"
import { useState } from "react"

export type NavigationLink = {
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

const Header = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="fixed w-full top-0">
      <div className="w-full sm:p-2">
        <div className="w-full px-6 sm:px-12 py-2 bg-white/70 text-black backdrop-blur-sm sm:rounded-xs flex justify-between items-center">
          <Link href={"/"}>
            <span className="font-bold text-2xl">p3nc1l</span>
          </Link>
          <span className="hidden sm:inline"><HeaderNavigation links={navigationLinks} /></span>
          <div className="block sm:hidden"><HeaderSidebarButton sidebarVisible={sidebarVisible} toggleSidebar={setSidebarVisible} /></div>
        </div>
      </div>
      <HeaderSidebar visible={sidebarVisible} links={navigationLinks} />
    </div>
  )
}

export default Header;