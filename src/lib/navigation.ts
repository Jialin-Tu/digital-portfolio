export type PageType =
  | "home"
  | "about"
  | "professional-knowledge"
  | "messaging"
  | "readme"
  | "projects"
  | "contact"
  | "gallery"
  | "blog"
  | "video-gallery"
  | "education"
  | "experience"
  | "post"
  | "publications"
  | "search"
  | "analytics"
  | "github";

export interface PageDescriptor {
  page: PageType;
  label: string;
  description: string;
  keywords: string[];
}

export const pageDescriptors: PageDescriptor[] = [
  {
    page: "home",
    label: "Home",
    description:
      "Welcome page with an overview of my portfolio and Software Engineering background.",
    keywords: [
      "home",
      "portfolio",
      "software engineering",
      "welcome"
    ]
  },

  {
    page: "about",
    label: "About",
    description:
      "Information about my Software Engineering background, interests, and current Master's study.",
    keywords: [
      "about",
      "profile",
      "software engineering",
      "student",
      "background"
    ]
  },

  {
    page: "post",
    label: "Post Feed",
    description:
      "Interactive posts, comments, likes, and image sharing.",
    keywords: [
      "posts",
      "feed",
      "community",
      "comments",
      "likes"
    ]
  },

  {
    page: "projects",
    label: "Projects",
    description:
      "A collection of my software development projects and practical experience.",
    keywords: [
      "projects",
      "software development",
      "web development",
      "backend",
      "Java",
      "Vue.js",
      "React"
    ]
  },

  {
    page: "publications",
    label: "Academic & Technical Interests",
    description:
      "My current academic and technical interests in Software Engineering and related technologies.",
    keywords: [
      "academic interests",
      "technical interests",
      "software engineering",
      "web development",
      "backend",
      "database"
    ]
  },

  {
    page: "education",
    label: "Education",
    description:
      "My academic qualifications and Software Engineering study experience.",
    keywords: [
      "education",
      "bsc",
      "msc",
      "software engineering",
      "university",
      "study"
    ]
  },

  {
  page: "experience",
  label: "Experience",
  description:
    "My internship experience in software development and 3D web visualisation.",
  keywords: [
    "experience",
    "internship",
    "software development",
    "Vue.js",
    "Three.js",
    "3D visualisation"
    ]
  },

  {
    page: "professional-knowledge",
    label: "Professional Knowledge",
    description:
      "Technical knowledge, software engineering skills, and practical project experience.",
    keywords: [
      "software engineering",
      "programming",
      "web development",
      "database",
      "skills",
      "projects",
      "Java",
      "Python",
      "React",
      "Vue.js"
    ]
  },

  {
    page: "messaging",
    label: "Portfolio FAQ",
    description:
      "Preset answers about my skills, projects and background.",
    keywords: [
      "questions",
      "skills",
      "projects",
      "faq",
      "contact"
    ]
  },

  {
    page: "readme",
    label: "README",
    description:
      "Information about the portfolio structure, features, and technologies.",
    keywords: [
      "readme",
      "structure",
      "features",
      "technologies",
      "React",
      "TypeScript",
      "Vite"
    ]
  },

  {
    page: "gallery",
    label: "Gallery",
    description:
      "A collection of images related to my projects, studies, and experiences.",
    keywords: [
      "gallery",
      "images",
      "photos",
      "projects",
      "study"
    ]
  },

  {
    page: "video-gallery",
    label: "Video Gallery",
    description:
      "A collection of educational, technical, and Software Engineering related videos.",
    keywords: [
      "videos",
      "YouTube",
      "tutorials",
      "software engineering",
      "web development"
    ]
  },

  {
    page: "blog",
    label: "Blog",
    description:
      "Posts about my learning experience, software engineering, and web development.",
    keywords: [
      "blog",
      "articles",
      "software engineering",
      "web development",
      "learning",
      "React",
      "TypeScript"
    ]
  },

  {
    page: "contact",
    label: "Contact",
    description:
      "Contact form and links to my online profiles.",
    keywords: [
      "contact",
      "message",
      "LinkedIn",
      "GitHub",
      "location"
    ]
  },

  {
    page: "search",
    label: "Search",
    description:
      "Search portfolio page titles, descriptions and keywords.",
    keywords: [
      "search",
      "find",
      "lookup",
      "discover",
      "quick access"
    ]
  },

  {
    page: "analytics",
    label: "Analytics",
    description:
      "Local portfolio usage analytics including page visits and search activity.",
    keywords: [
      "analytics",
      "statistics",
      "stats",
      "usage",
      "page views",
      "searches"
    ]
  },

  {
    page: "github",
    label: "GitHub",
    description:
      "Live GitHub profile and repository information.",
    keywords: [
      "GitHub",
      "repositories",
      "followers",
      "following",
      "profile"
    ]
  }
];

export const primaryNavItems: PageType[] = [
  "home",
  "about",
  "post",
  "projects",
  "publications",
  "professional-knowledge",
  "messaging",
  "readme",
  "search",
  "github",
  "analytics",
  "contact",
  "gallery",
  "video-gallery",
  "education",
  "experience",
];