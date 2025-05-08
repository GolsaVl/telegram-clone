import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import { useTheme } from "../context/theme-context";
import { cn } from "../lib/utils";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const currentTheme = themeOptions.find((option) => option.value === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault();
      const currentIndex = themeOptions.findIndex(
        (option) => option.value === theme,
      );
      const nextIndex = (currentIndex + 1) % themeOptions.length;
      setTheme(themeOptions[nextIndex].value as "light" | "dark" | "system");
    } else if (e.key === "ArrowUp" && isOpen) {
      e.preventDefault();
      const currentIndex = themeOptions.findIndex(
        (option) => option.value === theme,
      );
      const prevIndex =
        (currentIndex - 1 + themeOptions.length) % themeOptions.length;
      setTheme(themeOptions[prevIndex].value as "light" | "dark" | "system");
    }
  };

  return (
    <div className="relative" ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select theme"
        className="flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex items-center"
        >
          {currentTheme && (
            <>
              <currentTheme.icon className="h-5 w-5" />
              <ChevronDown
                className={cn(
                  "ml-1 h-4 w-4 transition-transform duration-200",
                  isOpen ? "rotate-180" : "rotate-0",
                )}
              />
            </>
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-10"
          >
            <ul role="listbox" aria-label="Theme options" className="py-1">
              {themeOptions.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={theme === option.value}
                >
                  <button
                    onClick={() => {
                      setTheme(option.value as "light" | "dark" | "system");
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center px-3 py-2 text-sm",
                      theme === option.value
                        ? "bg-primary-50 text-primary-700 dark:bg-gray-700 dark:text-primary-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                    )}
                  >
                    <option.icon className="mr-2 h-4 w-4" />
                    <span>{option.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
