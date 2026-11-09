import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      title: "Algorithm R&D Intern",
      company: "Institute of Software, Chinese Academy of Sciences",
      location: "China",
      period: "Jul 2023 - Aug 2023",
      description:
        "Worked on web-based 3D visualisation during an internship. Developed interactive visualisation features using Vue.js and Three.js and explored the use of 3D technologies in web applications.",
      achievements: [
        "Developed 3D web visualisation features using Vue.js and Three.js",
        "Implemented 3D model loading and visualisation",
        "Worked with lighting, shadows and environment settings",
        "Implemented camera-following animation and path-based movement",
        "Explored the use of VR technologies for visualisation"
      ],
      technologies: [
        "Vue.js",
        "Three.js",
        "JavaScript",
        "3D Visualisation",
        "Animation"
      ]
    }
  ];

  return (
    <section
      id="experience"
      className="py-20 px-4 bg-muted/30 min-h-screen"
    >
      <div className="container mx-auto max-w-5xl">

        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl mb-6">
            Experience
          </h1>

          <p className="text-lg text-muted-foreground">
            My practical experience in software development and web
            visualisation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">

            {experiences.map((exp, index) => (
              <Card key={index} className="relative">

                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                      <CardTitle className="text-xl">
                        {exp.title}
                      </CardTitle>

                      <p className="text-lg text-primary mt-1">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-col md:items-end gap-1">

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.period}
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>

                    </div>

                  </div>
                </CardHeader>

                <CardContent className="space-y-5">

                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>

                  <div>
                    <h4 className="mb-3">
                      Key Contributions
                    </h4>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((technology, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {technology}
                      </Badge>
                    ))}
                  </div>

                </CardContent>

              </Card>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
