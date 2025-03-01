import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const skills = [
    { category: "Languages", items: ["JavaScript", "TypeScript", "C", "C++", "Python"] },
    { category: "Frontend", items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Shad CN", "Chakra UI"] },
    { category: "Backend", items: ["Node.js", "Express.js", "Firebase", "SupaBase", "Next.js"] },
    { category: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL", "FireStore", "Firebase Realtime Database"] },
    { category: "Authentication & Security", items: ["JWT", "OAuth", "Auth0" ,"Firebase Auth", "NextAuth", "AWS Cognito"] },
    { category: "Cloud Platforms", items: ["AWS", "Vercel", "Heroku", "Netlify", "Firebase", "GCP (Google Cloud Platform)"] },
    { category: "Tools", items: ["Docker", "Vercel", "npm", "GitHub", "Netlify", "Yarn", "Figma", "Notion", "Git", "Mailgun", "Apps Script"] },
    { category: "DevOps & CI/CD", items: ["Docker", "GitHub Actions", "GitLab CI/CD"] },
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
