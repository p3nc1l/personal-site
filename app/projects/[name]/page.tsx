import { notFound } from "next/navigation";
import projects from "../projects";
import ImageCarousel from "@/app/ui/ImageCarousel";

const Page = async (props: { params: Promise<{ name: string }> }) => {
  const { name } = await props.params;
  const project = projects.find(project => project.name == name);

  if (!project) notFound();
  
  return (
    <>
      <h1 className="mt-2 text-3xl">{project.title}</h1>
      <div className="flex">
        <ImageCarousel imageUrls={project.imageUrls} alt={project.title} />
      </div>
    </>
  )
}

export default Page;