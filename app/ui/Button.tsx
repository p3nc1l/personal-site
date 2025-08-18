import { ReactNode } from "react"

const Button = (props: { children?: ReactNode, size?: "small" | "normal" | "large", fullWidth?: boolean }) => {
  const padding = props.size == "small" ? 2 : props.size == "large" ? 10 : 4;

  return (
    <span className={`cursor-pointer bg-white text-black rounded-sm font-bold text-center inline-block`} style={{ padding: padding, width: props.fullWidth ? "100%" : "max-content" }}>{props.children}</span>
  )
}

export default Button