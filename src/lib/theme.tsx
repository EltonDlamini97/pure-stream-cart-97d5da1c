import { useEffect, useState } from "react";

const KEY = "aqua-theme";

export function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    const initial = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem(KEY, next ? "dark" : "light");
      return next;
    });
  };

  return { dark, toggle };
}
