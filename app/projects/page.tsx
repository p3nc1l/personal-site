import { Metadata } from "next"
import projects from "./projects"
import Card from "../ui/Card"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse between David Szocs's projects"
}

const Page = () => {
  return (
    <>
      <h1 className="text-5xl mt-2 mb-8">Projects</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {projects.map((project, index) => 
          <Card key={index}>
            <Link href={`/projects/${project.name}`}>
              {project.imageUrls[0] ? 
              <div className={"w-full aspect-3/2 relative mb-4"}><Image className="object-cover" fill src={project.imageUrls[0]} alt={project.title} /></div> : 
              <div className={"w-full aspect-3/2 bg-black flex justify-center items-center mb-4"}>No image</div>}
              <div className="font-bold">{project.title}</div>
              <div className="text-sm text-justify">{project.shortDescription}</div>
            </Link>
          </Card>
        )}
      </div>
    </>
  )
}

export default Page