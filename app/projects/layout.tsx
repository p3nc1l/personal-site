import { ReactNode } from "react"

const ProjectsLayout = (props: { children?: ReactNode }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-2">
      {props.children}
    </div>
  )
}

export default ProjectsLayout