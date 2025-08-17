import { notFound } from "next/navigation";
import projects from "../projects";
import ImageCarousel from "@/app/ui/ImageCarousel";

const Page = async (props: { params: Promise<{ name: string }> }) => {
  const { name } = await props.params;
  const project = projects.find(project => project.name == name);

  if (!project) notFound();
  
  return (
    <>
      <h1 className="mt-2 mb-8 text-4xl font-bold">{project.title}</h1>
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="grow-7"><ImageCarousel imageUrls={project.imageUrls} alt={project.title} /></div>
        <div className="grow-3 flex flex-col gap-4 justify-center">
          <div>{project.shortDescription}</div>
        </div>
      </div>
    </>
  )
}

export default Page;