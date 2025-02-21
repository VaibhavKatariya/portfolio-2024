import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const skills = [
    { category: "Languages", items: ["JavaScript", "TypeScript", "C", "C++"] },
    { category: "Frontend", items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Shad CN", "Chakra UI"] },
    { category: "Backend", items: ["Node.js", "Express.js", "Firebase", "SupaBase"] },
    { category: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL", "FireStore", "Firebase Realtime Database"] },
    { category: "Authentication & Security", items: ["JWT", "OAuth", "Firebase Auth", "Auth0", "NextAuth", "AWS Cognito"] },
    { category: "Tools", items: ["Docker", "Vercel", "npm", "GitHub", "Netlify", "Yarn", "Figma", "Notion", "Git"] },
    { category: "Cloud Platforms", items: ["AWS", "Vercel", "Heroku", "Netlify", "Firebase", "GCP (Google Cloud Platform)"] },
    { category: "Version Control", items: ["Git", "GitHub", "GitLab"] },
    { category: "Other", items: ["ESLint", "Prettier", "REST APIs", "Postman", "GitHub Actions", "Zod", "Gemini AI"] }
  ];
  

export default function SkillsSection() {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="title text-2xl sm:text-3xl">Skills</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skillCategory) => (
          <Card key={skillCategory.category}>
            <CardContent className="p-4">
              <h3 className="mb-2 font-semibold">{skillCategory.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillCategory.items.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
