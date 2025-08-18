import Link from "next/link"

const Divider = () => {
  return (<span className="inline-block px-2 text-neutral-500">{">"}</span>)
}

const Breadcrumbs = (props: { breadcrumbs: {
  name: string,
  href: string
}[] }) => {
  return (
    <span className="text-lg">
      {props.breadcrumbs.map((breadcrumb, index) => 
      <span key={index}>
        {index != 0 ? <Divider /> : <></>}
        <Link href={breadcrumb.href}><u>{breadcrumb.name}</u></Link>
      </span>)}
    </span>
  )
}

export default Breadcrumbs