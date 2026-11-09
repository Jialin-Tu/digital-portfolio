import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ProfessionalKnowledge() {
  const knowledgeCategories = [
    {
      title: "Programming",
      skills: ["Java", "Python", "C", "JavaScript", "TypeScript"]
    },
    {
      title: "Web Development",
      skills: [
        "Spring Boot",
        "Vue.js",
        "React",
        "HTML",
        "CSS",
        "REST APIs"
      ]
    },
    {
      title: "Database & Tools",
      skills: [
        "MySQL",
        "Git",
        "GitHub",
        "VS Code",
        "IntelliJ IDEA",
        "Postman"
      ]
    },
    {
      title: "Software Engineering",
      skills: [
        "Object-Oriented Programming",
        "Database Design",
        "Software Architecture",
        "Software Testing",
        "Agile Development"
      ]
    }
  ];

  const projects = [
    {
      title: "E-commerce System",
      description:
        "Developed an e-commerce system using Spring Boot, MyBatis Plus, MySQL and Vue.js. Worked on product, order and user management features."
    },
    {
      title: "Online Mall",
      description:
        "Developed a web-based online mall using Vue.js and Bootstrap, including shopping cart and order management features."
    },
    {
      title: "Face Recognition Attendance System",
      description:
        "Worked as part of a team to develop a face recognition attendance system and contributed to the development of the project."
    },
    {
      title: "3D Web Visualisation",
      description:
        "Developed 3D web visualisation features using Vue.js and Three.js, including model loading, lighting, camera movement and animation."
    }
  ];

  return (
    <section
      id="professional-knowledge"
      className="py-20 px-4 bg-muted/30 min-h-screen"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl lg:text-4xl mb-6">
            Professional Knowledge
          </h1>

          <p className="text-lg text-muted-foreground">
            My technical knowledge and practical experience in Software
            Engineering, including programming, web development, databases and
            software development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {knowledgeCategories.map((category, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  {category.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl lg:text-3xl text-center mb-8">
            Projects & Practical Experience
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl mb-3">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}