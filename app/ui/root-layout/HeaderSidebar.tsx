import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { NavigationLink } from "./Header";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
})

const HeaderSidebar = (props: {visible?: boolean, links: NavigationLink[], style?: string}) => {
  const visible = props.visible || false;

  return (
    <AnimatePresence>
      {visible && <motion.div
        className={`absolute w-full h-screen sm:hidden ${props.style}`}
        initial={{x: "100vw"}}
        animate={{x: 0}}
        exit={{x: "100vw"}}
        transition={{type: "tween"}}
      >
        <div className={`flex flex-col w-full ${robotoMono.className}`}>
          {props.links.map((link, index) => 
          <Link key={index} href={link.href}>
            <div className="w-full px-4 py-4 text-2xl">{link.name}</div>
          </Link>
          )}
        </div>
      </motion.div>}
    </AnimatePresence>
  )
}

export default HeaderSidebar;