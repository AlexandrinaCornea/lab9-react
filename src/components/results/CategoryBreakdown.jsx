import { memo, useMemo } from "react";
import { getCategoryStats } from "../../utils/quizUtils";
import ProgressBar from "../common/ProgressBar";
import styles from "./CategoryBreakdown.module.css";

const CategoryBreakdown = memo(function CategoryBreakdown({
  questions,
  answers,
}) {
  const stats = useMemo(
    () => getCategoryStats(questions, answers),
    [questions, answers],
  );

  return (
    <div>
      <h3 className={styles.title}>Rezultate per Categorie</h3>
      <div className={styles.list}>
        {Object.entries(stats).map(([cat, { correct, total }]) => (
          <ProgressBar key={cat} value={correct} max={total} label={cat} />
        ))}
      </div>
    </div>
  );
});

export default CategoryBreakdown;
