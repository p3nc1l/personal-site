import { notFound } from "next/navigation";
import projects from "../projects";
import ImageCarousel from "@/app/ui/ImageCarousel";
import Button from "@/app/ui/Button";
import Tag from "@/app/ui/Tag";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

const Page = async (props: { params: Promise<{ name: string }> }) => {
  const { name } = await props.params;
  const project = projects.find(project => project.name == name);

  if (!project) notFound();

  const breadcrumbs = [{
    name: "Projects",
    href: "/projects"
  }, {
    name: project.title,
    href: `/projects/${name}`
  }]
  
  return (
    <>
      <div className="my-2"><Breadcrumbs breadcrumbs={breadcrumbs} /></div>
      <h1 className="mt-2 mb-8 text-4xl font-bold">{project.title}</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-[8fr_2fr]">
        <ImageCarousel imageUrls={project.imageUrls} alt={project.title} />
        <div className="flex flex-col gap-4">
          <div>{project.shortDescription}</div>
          <div className="flex gap-1.5">
            {project.tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
          </div>
          <a href={project.link} className="w-full"><Button size="large" fullWidth>VISIT SITE</Button></a>
        </div>
      </div>
      <div className="my-6 max-w-4xl px-2 long-description" dangerouslySetInnerHTML={{ __html: project.longDescription }} />
      <style>{`
        .long-description {
          a {
            text-decoration: underline;
          }
          ul {
            list-style: disc inside;
          }
        }
        
      `}</style>
    </>
  )
}

export default Page;