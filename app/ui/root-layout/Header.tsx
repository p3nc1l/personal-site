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

const headerStyle = "bg-white/85 text-black backdrop-blur-md";

const Header = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="sticky w-full top-0">
      <div className="w-full sm:p-2">
        <div className={`w-full px-6 sm:px-12 py-2 ${headerStyle} sm:rounded-xs flex justify-between items-center`}>
          <Link href={"/"}>
            <span className="font-bold text-2xl">p3nc1l</span>
          </Link>
          <span className="hidden sm:inline"><HeaderNavigation links={navigationLinks} /></span>
          <div className="block sm:hidden"><HeaderSidebarButton sidebarVisible={sidebarVisible} toggleSidebar={setSidebarVisible} /></div>
        </div>
      </div>
      <div className="relative">
        <HeaderSidebar visible={sidebarVisible} links={navigationLinks} style={headerStyle} />
      </div>
    </div>
  )
}

export default Header;