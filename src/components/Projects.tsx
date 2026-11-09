import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import projectData from "../data/projects.json";

import ecommerceImage from "../assets/e-Commerce.jpg";
import onlineMallImage from "../assets/OnlineMall.jpg";
import faceRecognitionImage from "../assets/R.jpg";
import threeDImage from "../assets/3D.jpg";

/** Fields used to display and search each project. */
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

/**
 * Keep image imports here so Vite can prepare the asset URLs.
 * The JSON file refers to these images by name.
 */
const projectImages: Record<string, string> = {
  ecommerce: ecommerceImage,
  onlineMall: onlineMallImage,
  faceRecognition: faceRecognitionImage,
  threeD: threeDImage,
};

const projects: Project[] = projectData;

const technologies = Array.from(
  new Set(projects.flatMap((project) => project.technologies))
).sort((first, second) => first.localeCompare(second));

/**
 * Display project data from JSON.
 * Search and technology filters are combined, so a project must
 * match both conditions to appear.
 */
export function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechnology, setSelectedTechnology] = useState("");

  const query = searchTerm.trim().toLowerCase();

  const filteredProjects = projects.filter((project) => {
    const searchableText = [
      project.title,
      project.description,
      ...project.technologies,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(query);
    const matchesTechnology =
      selectedTechnology === "" ||
      project.technologies.includes(selectedTechnology);

    return matchesSearch && matchesTechnology;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTechnology("");
  };

  return (
    <section
      id="projects"
      className="py-20 px-4 bg-background min-h-screen"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Projects</h1>

          <p className="text-muted-foreground max-w-3xl mx-auto">
            A collection of my software development projects and practical
            experience in web development, backend systems, databases and
            3D visualisation.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="project-search">Search projects</Label>

                <Input
                  id="project-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by title, description or technology"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-technology">
                  Filter by technology
                </Label>

                <select
                  id="project-technology"
                  value={selectedTechnology}
                  onChange={(event) =>
                    setSelectedTechnology(event.target.value)
                  }
                  className="w-full rounded-md border border-input bg-background text-foreground text-sm"
                  style={{ minHeight: "2.5rem", padding: "0.5rem 0.75rem" }}
                >
                  <option value="">All technologies</option>

                  {technologies.map((technology) => (
                    <option key={technology} value={technology}>
                      {technology}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <p
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="text-sm text-muted-foreground"
              >
                Showing {filteredProjects.length} of {projects.length} projects
              </p>

              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                disabled={searchTerm === "" && selectedTechnology === ""}
              >
                Clear filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl mb-2">No matching projects</h2>
            <p className="text-muted-foreground">
              Try another keyword or clear the filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-full aspect-square overflow-hidden">
                  <img
                    src={projectImages[project.image]}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-snug">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <Badge
                        key={technology}
                        variant="outline"
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
        )}
      </div>
    </section>
  );
}