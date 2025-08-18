import { Metadata } from "next"
import projects from "./projects"
import Card from "../ui/Card"
import Link from "next/link"
import Image from "next/image"
import Tag from "../ui/Tag"

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
          <Link key={index} href={`/projects/${project.name}`}>
            <Card>
              {project.imageUrls[0] ? 
              <div className={"w-full aspect-3/2 relative mb-4"}><Image className="object-cover" fill src={project.imageUrls[0]} alt={project.title} /></div> : 
              <div className={"w-full aspect-3/2 bg-black flex justify-center items-center mb-4"}>No image</div>}
              <div className="font-bold text-2xl">{project.title}</div>
              <div className="text-base text-justify">{project.shortDescription}</div>
              <div className="flex gap-1 mt-2">
                {project.tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
              </div>
            </Card>
          </Link>
        )}
      </div>
    </>
  )
}

export default Page