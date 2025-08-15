import Link from "next/link"

const Footer = () => {
  const contactFields = [{
    label: "Phone number",
    href: "tel:+40770249709",
    value: "+40 770 249 709"
  }, {
    label: "Email address",
    href: "mailto:szocsdavid598@gmail.com",
    value: "szocsdavid598@gmail.com"
  }]

  const links = [{
    name: "Projects",
    href: "/projects"
  }, {
    name: "About",
    href: "/about"
  }, {
    name: "Contact",
    href: "/contact"
  }]

  return (
    <div className="w-full border-t border-neutral-400 text-neutral-400 bg-[inherit]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mx-auto px-4 py-8 max-w-7xl gap-12">
        <div>
          <div className="font-bold text-4xl py-4 text-white">p3nc1l</div>
          <div className="max-w-xs">
            <div>SZŐCS DÁVID-SZILÁRD PERSOANĂ FIZICĂ AUTORIZATĂ</div>
            <div>Bulevardul BUCUREȘTII NOI, Nr. 136, Etaj PARTER, Ap. 5</div>
            <div>Cod Poștal: 012366</div>
            <div>București Sectorul 1</div>
            <div>România</div>
          </div>
          <div className="flex flex-col sm:flex-row py-4 gap-4">
            {contactFields.map((field, index) => 
            <div key={index} className="flex flex-col gap-2">
              <span>{field.label}</span>
              <a className="text-white font-bold" href={field.href}>{field.value}</a>
            </div>)}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span>Links</span>
          {links.map((link, index) => <Link className="text-white" key={index} href={link.href}>{link.name}</Link>)}
        </div>
      </div>
      <div className="text-center py-4">© 2025 p3nc1l. All rights reserved.</div>
    </div>
  )
}

export default Footer;