import projectsData from "@/data/projects.json";
import certificatesData from "@/data/certificates.json";
import { projectSchema, certificateSchema } from "@/lib/schemas";
import { CardLayout } from "./CardLayout";

interface Props {
  type: "projects" | "certificates";
  limit?: number;
}

export default function SectionCards({ type, limit }: Props) {
  const data =
    type === "projects" ? projectSchema.parse(projectsData).projects : type === "certificates" ? certificateSchema.parse(certificatesData).certificates : [];

  const items = limit ? data.slice(0, limit) : data;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item, id) => (
        <CardLayout key={id} project={item} />
      ))}
    </section>
  );
}
