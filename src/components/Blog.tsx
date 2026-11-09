import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "My Journey in Software Engineering",
      excerpt:
        "A short reflection on my journey from studying Software Engineering as an undergraduate to starting my Master's degree in Ireland.",
      content:
        "My interest in Software Engineering developed through university study and practical software projects. During my undergraduate studies, I worked with Java, Spring Boot, Vue.js and MySQL. I am now continuing my studies at the University of Limerick and developing my knowledge of modern software engineering.",
      date: "2026-09-30",
      readTime: "5 min read",
      tags: ["Software Engineering", "Education", "Career"],
      featured: true
    },
    {
      id: 2,
      title: "What I Learned from Building an E-commerce System",
      excerpt:
        "My experience developing an e-commerce system and working with backend APIs, databases and web technologies.",
      content:
        "The e-commerce system was one of my main software projects. I worked with Spring Boot, MyBatis Plus, MySQL and Vue.js to develop product, order and user-related functions.",
      date: "2026-09-20",
      readTime: "6 min read",
      tags: ["Java", "Spring Boot", "MySQL"],
      featured: false
    },
    {
      id: 3,
      title: "Learning Backend Development",
      excerpt:
        "Some of the key ideas I have learned while developing backend applications and REST APIs.",
      content:
        "Backend development has helped me understand how applications process data, communicate through APIs and interact with databases. I have mainly worked with Java, Spring Boot, MySQL and REST APIs.",
      date: "2026-09-15",
      readTime: "5 min read",
      tags: ["Backend", "REST APIs", "Java"],
      featured: false
    },
    {
      id: 4,
      title: "Understanding Software Engineering Projects",
      excerpt:
        "What I have learned about software development, teamwork, project planning and problem solving through university projects.",
      content:
        "University projects have helped me understand that software development involves more than writing code. Planning, communication, testing, documentation and teamwork are also important parts of software engineering.",
      date: "2026-09-10",
      readTime: "4 min read",
      tags: ["Software Engineering", "Projects", "Teamwork"],
      featured: false
    }
  ];

  return (
    <section id="blog" className="py-20 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl">

        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Blog</h1>
          <p className="text-muted-foreground">
            My thoughts, learning experiences and reflections on Software
            Engineering.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts
          .filter((post) => post.featured)
          .map((post) => (
            <Card key={post.id} className="mb-12 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">

                <div className="relative h-64 lg:h-auto">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop"
                    alt="Software Engineering"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                </div>

                <div className="p-8">
                  <CardHeader className="p-0 mb-4">

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>

                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <CardTitle className="text-2xl">
                      {post.title}
                    </CardTitle>

                  </CardHeader>

                  <CardContent className="p-0">

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="group">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>

                  </CardContent>
                </div>
              </div>
            </Card>
          ))}

        {/* Recent Posts */}
        <div className="mb-8">
          <h2 className="text-2xl mb-8">Recent Posts</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-lg transition-shadow"
                >

                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop"
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <CardHeader>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>

                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <CardTitle className="text-lg leading-tight">
                      {post.title}
                    </CardTitle>

                  </CardHeader>

                  <CardContent>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>

                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Posts
          </Button>
        </div>

      </div>
    </section>
  );
}