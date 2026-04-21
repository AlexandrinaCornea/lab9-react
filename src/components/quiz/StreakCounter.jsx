import { memo } from "react";
import styles from "./StreakCounter.module.css";

const StreakCounter = memo(function StreakCounter({ streak }) {
  if (streak < 2) return null;
  return <div className={styles.counter}>Streak: {streak}</div>;
});

export default StreakCounter;
