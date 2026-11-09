import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Github, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface HomeProps {
  onNavigate?: (page: string) => void;
}

/**
 * Portfolio introduction and links to the main pages.
 * The entrance animation respects the visitor's motion preference.
 */
export function Home({ onNavigate }: HomeProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.from(section.querySelectorAll("[data-intro]"), {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "transform,opacity",
        });
      }
    );

    // Remove animations and media listeners when leaving this page.
    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center py-20 px-4 bg-background"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <p data-intro className="text-primary mb-4">
            Software Engineering Student
          </p>

          <h1
            data-intro
            className="text-4xl md:text-5xl lg:text-6xl mb-6"
          >
            Hello, I'm Jialin
          </h1>

          <p
            data-intro
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            I am currently studying for a Master's degree in Software
            Engineering at the University of Limerick, Ireland. I am
            interested in software development, web applications and
            backend technologies.
          </p>

          <div
            data-intro
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              onClick={() => onNavigate?.("about")}
              style={{ backgroundColor: "#166534" }}
              className="text-white hover:opacity-90"
            >
              About Me
              <ArrowRight
                className="w-4 h-4 ml-2"
                aria-hidden="true"
              />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate?.("projects")}
            >
              View Projects
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card data-intro>
              <CardContent className="p-6">
                <h2 className="text-xl mb-2">
                  Software Engineering
                </h2>

                <p className="text-sm text-muted-foreground">
                  Developing knowledge of software design, development,
                  testing and maintenance.
                </p>
              </CardContent>
            </Card>

            <Card data-intro>
              <CardContent className="p-6">
                <h2 className="text-xl mb-2">Web Development</h2>

                <p className="text-sm text-muted-foreground">
                  Experience with Java, Spring Boot, React, Vue.js,
                  TypeScript and REST APIs.
                </p>
              </CardContent>
            </Card>

            <Card data-intro>
              <CardContent className="p-6">
                <h2 className="text-xl mb-2">Continuous Learning</h2>

                <p className="text-sm text-muted-foreground">
                  Currently developing my technical and professional
                  skills through Master's study and practical projects.
                </p>
              </CardContent>
            </Card>
          </div>

          <div
            data-intro
            className="flex justify-center gap-4 mt-10"
          >
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://github.com/Jialin-Tu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github
                  className="w-4 h-4 mr-2"
                  aria-hidden="true"
                />
                GitHub
              </a>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate?.("contact")}
            >
              <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}