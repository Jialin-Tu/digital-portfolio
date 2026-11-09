import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import profileImage from "../assets/profile.jpg";
import {
  pageDescriptors,
  primaryNavItems,
} from "../lib/navigation";
import type { PageType } from "../lib/navigation";

interface HeaderProps {
  readonly onNavigate: (page: PageType) => void;
  readonly isDarkMode: boolean;
  readonly onToggleTheme: () => void;
}

const navItems = primaryNavItems.map((page) => {
  const descriptor = pageDescriptors.find(
    (entry) => entry.page === page
  );

  return {
    page,
    label: descriptor?.label ?? page,
  };
});

/**
 * Shared navigation and theme controls.
 * The expanded menu scrolls separately from the page.
 */
export function Header({
  onNavigate,
  isDarkMode,
  onToggleTheme,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleNavigation = (page: PageType) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: "#166534" }}
    >
      <div className="container mx-auto px-4">
        <div
          className="flex items-center justify-between"
          style={{ height: "72px", gap: "16px" }}
        >
          <div className="flex items-center space-x-4">
            <div
              className="rounded-full overflow-hidden border-2 border-white/20"
              style={{
                width: "48px",
                height: "48px",
                flexShrink: 0,
              }}
            >
              <img
                src={profileImage}
                alt="Jialin Tu"
                className="w-full h-full object-cover"
                width={48}
                height={48}
              />
            </div>

            <div className="hidden sm:block">
              <div className="text-white font-medium">
                Jialin Tu
              </div>
            </div>
          </div>

          <nav
            aria-label="Main navigation"
            className="hidden xl:flex items-center space-x-5"
            style={{ minWidth: 0, overflowX: "auto" }}
          >
            {navItems.map((item) => (
              <button
                key={item.page}
                type="button"
                onClick={() => handleNavigation(item.page)}
                className="text-white/90 hover:text-white transition-colors text-sm"
                style={{
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  padding: "8px 0",
                }}
              >
                {item.page === "search" ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Search
                      className="w-4 h-4"
                      aria-hidden="true"
                    />
                    {item.label}
                  </span>
                ) : (
                  item.label
                )}
              </button>
            ))}
          </nav>

          <div
            className="flex items-center gap-2"
            style={{ flexShrink: 0 }}
          >
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"
              aria-label={
                isDarkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="p-2 text-white xl:hidden"
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              aria-label={
                isMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Expanded navigation"
            className="xl:hidden border-t border-white/20"
            style={{
              maxHeight: "calc(100dvh - 72px)",
              overflowY: "auto",
              overscrollBehaviorY: "contain",
            }}
          >
            <div
              className="flex flex-col"
              style={{ padding: "8px 0 24px" }}
            >
              {navItems.map((item) => (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => handleNavigation(item.page)}
                  className="text-left text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                  style={{
                    minHeight: "44px",
                    padding: "10px 12px",
                    flexShrink: 0,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}