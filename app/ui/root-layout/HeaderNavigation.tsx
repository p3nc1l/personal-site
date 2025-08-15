"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Roboto_Mono } from "next/font/google";
import { NavigationLink } from "./Header";

const robotoMono = Roboto_Mono({
  subsets: ["latin"]
})

const HeaderNavigation = (props: {links: NavigationLink[]}) => {
  const pathname = usePathname();

  return (
    <div className={`flex gap-6`}>
      {props.links.map((link, index) => <Link className={ `${pathname == link.href && "font-black"} ${robotoMono.className}`} key={index} href={link.href}>{link.name}</Link>)}
    </div>
  )
}

export default HeaderNavigation