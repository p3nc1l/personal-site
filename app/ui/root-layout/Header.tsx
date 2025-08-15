import Link from "next/link"
import HeaderNavigation from "./HeaderNavigation"
import HeaderButton from "./HeaderButton"

const Header = () => {
  return (
    <div className="sticky top-0 w-full sm:p-2">
      <div className="w-full px-12 py-2 bg-white/70 text-black backdrop-blur-sm sm:rounded-xs flex justify-between items-center">
        <Link href={"/"}>
          <span className="font-bold text-2xl">p3nc1l</span>
        </Link>
        <span className="hidden sm:inline"><HeaderNavigation  /></span>
        <div className="block sm:hidden"><HeaderButton /></div>
      </div>
    </div>
  )
}

export default Header;