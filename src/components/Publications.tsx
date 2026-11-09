import React from "react";

type AcademicInterest = {
  title: string;
  description: string;
  areas: string[];
};

const academicInterests: AcademicInterest[] = [
  {
    title: "Software Engineering",
    description:
      "Developing knowledge and practical skills in software design, development, testing and maintenance.",
    areas: [
      "Software Design",
      "Software Architecture",
      "Software Testing",
      "Software Maintenance"
    ]
  },
  {
    title: "Web Development",
    description:
      "Interested in developing modern web applications and learning how frontend and backend technologies work together.",
    areas: [
      "React",
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "REST APIs"
    ]
  },
  {
    title: "Backend Development",
    description:
      "Interested in backend development and building reliable applications with databases and server-side technologies.",
    areas: [
      "Java",
      "Spring Boot",
      "MySQL",
      "MyBatis Plus",
      "API Development"
    ]
  },
  {
    title: "Database Systems",
    description:
      "Interested in database design, data management and the use of relational databases in software applications.",
    areas: [
      "MySQL",
      "Database Design",
      "SQL",
      "CRUD Operations",
      "Data Management"
    ]
  },
  {
    title: "Software Architecture",
    description:
      "Developing an understanding of software architecture, quality attributes and architectural design decisions.",
    areas: [
      "Architectural Patterns",
      "Quality Attributes",
      "Extensibility",
      "Design Decisions"
    ]
  },
  {
    title: "3D Web Visualisation",
    description:
      "Practical experience in developing interactive 3D visualisation features for web applications.",
    areas: [
      "Three.js",
      "3D Models",
      "Lighting",
      "Animation",
      "Camera Movement"
    ]
  }
];

export const Publications: React.FC = () => {
  return (
    <section className="container mx-auto py-12 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4">
          Academic & Technical Interests
        </h2>

        <p className="text-muted-foreground text-lg">
          My current academic and technical interests as a Software
          Engineering student at the University of Limerick.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {academicInterests.map((interest, index) => (
          <div
            key={index}
            className="bg-background rounded-lg shadow-md p-6 border border-border"
          >
            <h3 className="text-xl font-semibold mb-3">
              {interest.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-5">
              {interest.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {interest.areas.map((area, areaIndex) => (
                <span
                  key={areaIndex}
                  className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};