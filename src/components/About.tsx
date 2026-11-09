import { Card, CardContent } from "./ui/card";
import { Code, Lightbulb, Users, Zap } from "lucide-react";

export function About() {
  const qualities = [
    {
      icon: Code, 
      title: "Software Development",
      description: "Interested in building web applications and practical software solutions."
    },
    {
      icon: Lightbulb,
      title: "Backend Development",
      description: "Experience with Java, Spring Boot, REST APIs and database systems."
    },
    {
      icon: Users,
      title: "Problem Solving",
      description: "Enjoy solving programming problems and understanding how software systems work."
    },
    {
      icon: Zap,
      title: "Teamwork",
      description: "Experience working on software projects and collaborating with team members."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-6">About</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I am Jialin Tu, a Software Engineering student currently pursuing a Master's degree at the University of Limerick in Ireland.
            I am interested in software development, backend development, wen applications and database systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {qualities.map((quality) => {
            const Icon = quality.icon;
            return (
              <Card key={quality.title} className="text-center group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="mb-2">{quality.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {quality.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-muted/50 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl mb-4">My Journey</h3>
              <p className="text-muted-foreground mb-4">
                I am currently studying for a Master's degree in Software Engineering at the University of Limerick in Ireland.
                My studies focus on software development, software engineering and modern computing technologies.
              </p>
              <p className="text-muted-foreground mb-4">
                I completed my Bachelor's degree in Software Engineering in China. During my undergraduate studies, I worked on projects
                involving Java, Spring Boot, Vue.js and MySQL.
              </p>
              <p className="text-muted-foreground">
                Before starting my Master's degree, I completed a Pre-Master's Programme at OnCampus Ireland in Dublin. This helped me
                improve my academic, research and communication skills and prepared me for postgraduate study in Software Engineering.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Java</span>
                <span className="text-sm text-muted-foreground">Good</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[60%]"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Python</span>
                <span className="text-sm text-muted-foreground">Good</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[60%]"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Database</span>
                <span className="text-sm text-muted-foreground">Good</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[60%]"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Web Development</span>
                <span className="text-sm text-muted-foreground">Good</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[60%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}