"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"]
})

const HeaderNavigation = () => {
  const pathname = usePathname();

  const links = [{
    name: "projects",
    href: "/projects"
  }, {
    name: "about",
    href: "/about"
  }, {
    name: "contact",
    href: "/contact"
  }]

  return (
    <div className={`flex gap-6`}>
      {links.map((link, index) => <Link className={ `${pathname == link.href && "font-black"} ${robotoMono.className}`} key={index} href={link.href}>{link.name}</Link>)}
    </div>
  )
}

export default HeaderNavigation