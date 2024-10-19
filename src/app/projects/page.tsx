import Projects from "@/components/Projects";
import Breadcrumbs from "@/components/Breadcrumbs";


export default async function ProjectPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">My Projects</h1>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Projects" },
        ]}
      />
      <Projects />
    </article>
  );
}