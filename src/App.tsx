import { lazy, Suspense, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Footer } from "./components/Footer";
import type { PageType } from "./lib/navigation";
import { trackPageView, trackThemeChange } from "./lib/analytics";

/**
 * Keep Home in the initial bundle.
 * Load the other pages when visitors first open them.
 */
const About = lazy(() =>
  import("./components/About").then((module) => ({
    default: module.About,
  }))
);

const Projects = lazy(() =>
  import("./components/Projects").then((module) => ({
    default: module.Projects,
  }))
);

const Contact = lazy(() =>
  import("./components/Contact").then((module) => ({
    default: module.Contact,
  }))
);

const ProfessionalKnowledge = lazy(() =>
  import("./components/ProfessionalKnowledge").then((module) => ({
    default: module.ProfessionalKnowledge,
  }))
);

const Messaging = lazy(() =>
  import("./components/Messaging").then((module) => ({
    default: module.Messaging,
  }))
);

const Readme = lazy(() =>
  import("./components/Readme").then((module) => ({
    default: module.Readme,
  }))
);

const Education = lazy(() =>
  import("./components/Education").then((module) => ({
    default: module.Education,
  }))
);

const Experience = lazy(() =>
  import("./components/Experience").then((module) => ({
    default: module.Experience,
  }))
);

const Blog = lazy(() =>
  import("./components/Blog").then((module) => ({
    default: module.Blog,
  }))
);

const Gallery = lazy(() =>
  import("./components/Gallery").then((module) => ({
    default: module.Gallery,
  }))
);

const VideoGallery = lazy(() =>
  import("./components/VideoGallery").then((module) => ({
    default: module.VideoGallery,
  }))
);

const PostFeed = lazy(() =>
  import("./components/PostFeed").then((module) => ({
    default: module.PostFeed,
  }))
);

const Publications = lazy(() =>
  import("./components/Publications").then((module) => ({
    default: module.Publications,
  }))
);

const Search = lazy(() =>
  import("./components/Search").then((module) => ({
    default: module.Search,
  }))
);

const Analytics = lazy(() =>
  import("./components/Analytics").then((module) => ({
    default: module.Analytics,
  }))
);

const GitHubIntegration = lazy(() =>
  import("./components/GitHubIntegration").then((module) => ({
    default: module.GitHubIntegration,
  }))
);

const THEME_STORAGE_KEY = "portfolio.theme";

const PAGE_IDS: readonly PageType[] = [
  "home",
  "about",
  "projects",
  "contact",
  "gallery",
  "blog",
  "video-gallery",
  "post",
  "education",
  "experience",
  "professional-knowledge",
  "messaging",
  "readme",
  "publications",
  "search",
  "analytics",
  "github",
];

/**
 * Read the selected page from the URL.
 * Empty or unknown hashes open Home.
 */
function getPageFromHash(): PageType {
  const page = window.location.hash.slice(1);
  return PAGE_IDS.find((id) => id === page) ?? "home";
}

/**
 * Read the saved theme before the first render.
 * Use light mode if browser storage is unavailable.
 */
function getInitialTheme(): boolean {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark";
  } catch {
    return false;
  }
}

/** Show a status message while a page's code is loading. */
function PageLoading() {
  return (
    <div
      role="status"
      className="min-h-[50vh] flex items-center justify-center px-4"
    >
      <p className="text-muted-foreground">Loading page...</p>
    </div>
  );
}

/**
 * Shared layout, page navigation and theme settings.
 * Each page component handles its own content and interactions.
 */
export default function App() {
  const [currentPage, setCurrentPage] =
    useState<PageType>(getPageFromHash);
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  /**
   * Listen for URL changes, including browser back and forward.
   * Remove the listener when the component unmounts.
   */
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);

    try {
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        isDarkMode ? "dark" : "light"
      );
    } catch {
      // Theme switching still works if the preference cannot be saved.
    }
  }, [isDarkMode]);

  useEffect(() => {
    trackPageView(currentPage);
  }, [currentPage]);

  /**
   * Change the URL so pages can be bookmarked and shared.
   * The hashchange listener updates the displayed page.
   */
  const handleNavigate = (page: PageType) => {
    if (window.location.hash !== `#${page}`) {
      window.location.hash = page;
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode((value) => !value);
    trackThemeChange();
  };

  /** Match the selected page to its component. */
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            onNavigate={(page) => handleNavigate(page as PageType)}
          />
        );
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
      case "gallery":
        return <Gallery />;
      case "blog":
        return <Blog />;
      case "video-gallery":
        return <VideoGallery />;
      case "post":
        return <PostFeed />;
      case "education":
        return <Education />;
      case "experience":
        return <Experience />;
      case "professional-knowledge":
        return <ProfessionalKnowledge />;
      case "messaging":
        return <Messaging />;
      case "readme":
        return <Readme />;
      case "publications":
        return <Publications />;
      case "search":
        return <Search onNavigate={handleNavigate} />;
      case "analytics":
        return <Analytics />;
      case "github":
        return <GitHubIntegration />;
      default:
        return (
          <Home
            onNavigate={(page) => handleNavigate(page as PageType)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleTheme={handleThemeToggle}
      />

      <main className="pt-16">
        <Suspense fallback={<PageLoading />}>
          {renderPage()}
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}