import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-8">

            <div className="space-y-4">

              <Badge variant="secondary" className="w-fit">
                Software Engineering Student
              </Badge>

              <h1 className="text-5xl lg:text-6xl tracking-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Jialin Tu
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl">
                I am currently studying for a Master's degree in Software
                Engineering at the University of Limerick, Ireland. I am
                interested in software development, web applications,
                backend technologies, and building practical software
                solutions.
              </p>

            </div>

            <div className="flex flex-wrap gap-4">

              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <a
                  href="https://github.com/Jialin-Tu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/jialin-tu-9a1218400/?isSelfProfile=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>

            </div>

            <div className="flex flex-wrap items-center gap-8 pt-8">

              <div>
                <div className="text-2xl">
                  MSc
                </div>

                <div className="text-sm text-muted-foreground">
                  Software Engineering
                </div>
              </div>

              <div>
                <div className="text-2xl">
                  BSc
                </div>

                <div className="text-sm text-muted-foreground">
                  Software Engineering
                </div>
              </div>

              <div>
                <div className="text-2xl">
                  4+
                </div>

                <div className="text-sm text-muted-foreground">
                  Software Projects
                </div>
              </div>

            </div>

          </div>

          <div className="relative">

            <div className="relative">

              <ImageWithFallback
                src="https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU4ODYyMjg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Software Engineering workspace"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />

            </div>

          </div>

        </div>

        <div className="flex justify-center mt-16">

          <button
            onClick={scrollToAbout}
            className="animate-bounce p-2 rounded-full border border-border hover:bg-accent transition-colors"
            aria-label="Scroll to About section"
          >
            <ArrowDown className="w-6 h-6" />
          </button>

        </div>

      </div>
    </section>
  );
}