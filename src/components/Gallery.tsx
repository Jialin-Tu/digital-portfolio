import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";

import ecommerceImage from "../assets/e-Commerce.jpg";
import onlineMallImage from "../assets/OnlineMall.jpg";
import ulImage from "../assets/UL.jpg";

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = [
    "All",
    "Web Development",
    "Software Engineering",
    "3D Visualisation",
    "University",
  ];

  const galleryItems = [
    {
      id: 1,
      title: "E-commerce System",
      category: "Web Development",
      description:
        "A web-based e-commerce project developed using Spring Boot, MySQL and Vue.js.",
      image: ecommerceImage,
    },
    {
      id: 2,
      title: "Online Mall",
      category: "Web Development",
      description:
        "A web-based online shopping project with product browsing, shopping cart and order management features.",
      image: onlineMallImage,
    },
    {
      id: 3,
      title: "Software Development",
      category: "Software Engineering",
      description:
        "A practical software engineering project involving system design, development and database management.",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1080&q=80",
    },
    {
      id: 4,
      title: "3D Web Visualisation",
      category: "3D Visualisation",
      description:
        "3D visualisation work developed using Vue.js and Three.js during my internship.",
      image:
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1080&q=80",
    },
    {
      id: 5,
      title: "Web Development",
      category: "Web Development",
      description:
        "Practical experience with modern web development technologies including React, Vue.js and TypeScript.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1080&q=80",
    },
    {
      id: 6,
      title: "Software Engineering Study",
      category: "University",
      description:
        "My current Master's study in Software Engineering at the University of Limerick.",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1080&q=80",
    },
    {
      id: 7,
      title: "Programming",
      category: "Software Engineering",
      description:
        "Developing programming skills with Java, Python, C, JavaScript and TypeScript.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1080&q=80",
    },
    {
      id: 8,
      title: "Database Development",
      category: "Software Engineering",
      description:
        "Practical experience with MySQL, database design, SQL and CRUD operations.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1080&q=80",
    },
    {
      id: 9,
      title: "University of Limerick",
      category: "University",
      description:
        "Studying Software Engineering at the University of Limerick, Ireland.",
      image: ulImage,
    },
  ];

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category === selectedCategory
        );

  const handlePrevImage = () => {
    if (selectedImage === null) return;

    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedImage
    );

    const prevIndex =
      currentIndex > 0
        ? currentIndex - 1
        : filteredItems.length - 1;

    setSelectedImage(filteredItems[prevIndex].id);
  };

  const handleNextImage = () => {
    if (selectedImage === null) return;

    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedImage
    );

    const nextIndex =
      currentIndex < filteredItems.length - 1
        ? currentIndex + 1
        : 0;

    setSelectedImage(filteredItems[nextIndex].id);
  };

  const selectedImageData = filteredItems.find(
    (item) => item.id === selectedImage
  );

  return (
    <section
      id="gallery"
      className="py-20 px-4 bg-background min-h-screen"
    >
      <div className="container mx-auto max-w-6xl">

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">
            Gallery
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of images related to my software projects,
            university study and technical experience.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                selectedCategory === category
                  ? "default"
                  : "outline"
              }
              onClick={() => {
                setSelectedCategory(category);
                setSelectedImage(null);
              }}
              className="px-6"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {filteredItems.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="group cursor-pointer w-full text-left bg-transparent border-none p-0"
                  onClick={() =>
                    setSelectedImage(item.id)
                  }
                  aria-label={`View details for ${item.title}`}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <h3 className="text-lg font-medium mb-2">
                          {item.title}
                        </h3>

                        <p className="text-sm text-white/80">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        {item.category}
                      </Badge>
                    </div>

                  </div>
                </button>
              </DialogTrigger>

              {/* Image Dialog */}
              <DialogContent className="max-w-4xl p-0">
                {selectedImageData && (
                  <div className="relative">

                    {/* Close Button */}
                    <button
                      onClick={() =>
                        setSelectedImage(null)
                      }
                      className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                      aria-label="Close image"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {/* Previous Button */}
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Large Image */}
                    <img
                      src={selectedImageData.image}
                      alt={selectedImageData.title}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />

                    {/* Image Information */}
                    <div className="p-6 bg-background">
                      <div className="flex items-start justify-between gap-4">

                        <div>
                          <h3 className="text-xl font-medium mb-2">
                            {selectedImageData.title}
                          </h3>

                          <p className="text-muted-foreground">
                            {selectedImageData.description}
                          </p>
                        </div>

                        <Badge variant="outline">
                          {selectedImageData.category}
                        </Badge>

                      </div>
                    </div>

                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* More Images */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            disabled
          >
            More Images Coming Soon
          </Button>
        </div>

      </div>
    </section>
  );
}
