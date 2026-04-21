import { memo } from "react";
import Badge from "../common/Badge";
import styles from "./QuizProgress.module.css";

const QuizProgress = memo(function QuizProgress({
  currentIndex,
  total,
  category,
  difficulty,
}) {
  return (
    <div className={styles.progress}>
      <span className={styles.label}>
        Intrebarea {currentIndex + 1} / {total}
      </span>
      <Badge variant="category">{category}</Badge>
      <Badge variant={difficulty}>{difficulty}</Badge>
    </div>
  );
});

export default QuizProgress;
