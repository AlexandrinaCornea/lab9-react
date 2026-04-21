import { useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const handleClick = useCallback(() => toggleTheme(), [toggleTheme]);

  return (
    <button
      className={styles.toggle}
      onClick={handleClick}
      aria-label="Comută tema"
      title={theme === "light" ? "Dark mode" : "Light mode"}
    >
      {theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
}

export default ThemeToggle;
