import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import careerData from "@/data/career.json";
import educationData from "@/data/education.json";
import volunteeringData from "@/data/volunteering.json";
import { careerSchema, educationSchema, volunteeringSchema } from "@/lib/schemas";
import Timeline from "./Timeline";

export default function Experience() {
  const career = careerSchema.parse(careerData).career;
  const education = educationSchema.parse(educationData).education;
  const volunteering = volunteeringSchema.parse(volunteeringData).volunteering;

  return (
    <Tabs defaultValue="work">
      <TabsList className="mb-2 grid w-full grid-cols-3">
        <TabsTrigger value="work">Work</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="Volunteering">Volunteering</TabsTrigger>
      </TabsList>
      <TabsContent value="work">
        <Timeline experience={career}></Timeline>
      </TabsContent>
      <TabsContent value="education">
        <Timeline experience={education}></Timeline>
      </TabsContent>
      <TabsContent value="Volunteering">
        <Timeline experience={volunteering}></Timeline>
      </TabsContent>
    </Tabs>
  );
}
