import * as React from "react";

export interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search…",
  className = "",
  autoFocus = false,
}) => {
  const [internalValue, setInternalValue] = React.useState(value ?? "");
  const [expanded, setExpanded] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Track screen size for responsive behavior
  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 640);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Focus input on Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  React.useEffect(() => {
    if (value !== undefined && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);

  // Responsive: show button on mobile, input on desktop or when expanded
  return (
    <div className="relative w-full max-w-md">
      {/* Mobile button */}
      {!expanded && !isDesktop && (
        <button
          type="button"
          className="sm:hidden w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-300 dark:bg-zinc-800 dark:border-gray-700"
          aria-label="Open search"
          onClick={() => {
            setExpanded(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-7 text-gray-400 dark:text-gray-300"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      {/* Search input: always on desktop, or expanded on mobile */}
      {(expanded || isDesktop) && (
        <>
          <input
            ref={inputRef}
            type="search"
            value={internalValue}
            onChange={handleChange}
            placeholder={placeholder}
            className={`pl-12 pr-6 py-6 sm:pl-10 sm:pr-4 sm:py-2 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-accent text-lg sm:text-base ${className} dark:bg-zinc-800 dark:border-gray-700 w-full`}
            aria-label={placeholder}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = `/search?q=${encodeURIComponent(
                  internalValue
                )}`;
              }
              if (e.key === "Escape" && expanded && !isDesktop) {
                setExpanded(false);
              }
            }}
            onBlur={() => {
              // Collapse only on mobile when input loses focus
              if (!isDesktop) {
                setExpanded(false);
              }
            }}
          />
          {/* Icon and helper text for input */}
          <span className="absolute left-4 sm:left-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-7 sm:size-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <p className="absolute right-4 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 hidden sm:block text-lg sm:text-base">
            Ctrl+K
          </p>
        </>
      )}
    </div>
  );
};
