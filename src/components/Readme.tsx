import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  User,
  GraduationCap,
  Code,
  FolderKanban,
  MessageSquare,
  Image,
  Video,
  BookOpen,
  Search,
  Github
} from "lucide-react";

export function Readme() {
  const pages = [
    {
      title: "About",
      description:
        "Provides information about my background, interests and Software Engineering journey.",
      icon: User
    },
    {
      title: "Education",
      description:
        "Shows my academic background, including my current Master's degree and previous studies.",
      icon: GraduationCap
    },
    {
      title: "Professional Knowledge",
      description:
        "Presents my programming skills, web development knowledge, software engineering knowledge and practical projects.",
      icon: Code
    },
    {
      title: "Projects",
      description:
        "Displays software projects and practical development experience.",
      icon: FolderKanban
    },
    {
      title: "Blog",
      description:
        "Contains posts about my learning experiences, Software Engineering and technical topics.",
      icon: BookOpen
    },
    {
      title: "Portfolio FAQ",
      description:
        "Provides an interactive chat interface where visitors can send messages.",
      icon: MessageSquare
    },
    {
      title: "Gallery",
      description:
        "Provides a space for displaying project, university and event images.",
      icon: Image
    },
    {
      title: "Video Gallery",
      description:
        "Provides a space for displaying videos, demonstrations and other multimedia content.",
      icon: Video
    },
    {
      title: "Search",
      description:
        "Allows visitors to search across different sections of the portfolio.",
      icon: Search
    },
    {
      title: "GitHub",
      description:
        "Provides access to my GitHub profile and software development work.",
      icon: Github
    }
  ];

  const technologies = [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "Lucide React",
    "Redux",
    "Node.js"
  ];

  return (
    <section
      id="readme"
      className="py-20 px-4 bg-background min-h-screen"
    >
      <div className="container mx-auto max-w-6xl">

        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">
            Portfolio README
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            This page describes the structure, main features and technologies
            used in my digital portfolio.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              About This Portfolio
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              This digital portfolio was developed by evolving an existing
              portfolio application. The original structure and reusable
              components were analysed and then modified or extended to
              represent my own academic background, Software Engineering
              knowledge, projects and interests.
            </p>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-2xl mb-6">
            Portfolio Structure
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {pages.map((page) => {
              const Icon = page.icon;

              return (
                <Card key={page.title}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">

                      <div className="p-3 rounded-lg bg-muted">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <h3 className="text-lg mb-2">
                          {page.title}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {page.description}
                        </p>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              Technologies Used
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <Badge
                  key={technology}
                  variant="secondary"
                >
                  {technology}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Evolution of the Portfolio
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              The portfolio was extended by reusing the existing React and
              TypeScript structure. New content and functionality were added,
              including Professional Knowledge and Portfolio FAQ.
              Existing sections such as Education and Blog were also adapted
              to represent my own experience and learning journey.
            </p>
          </CardContent>
        </Card>

      </div>
    </section>
  );
}