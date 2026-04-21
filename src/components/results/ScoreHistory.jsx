import { memo, useMemo } from "react";
import { getScoreHistory } from "../../utils/quizUtils";
import styles from "./ScoreHistory.module.css";

const headers = ["#", "Utilizator", "Scor", "%", "Categorie", "Streak"];

const ScoreHistory = memo(function ScoreHistory({ version }) {
  const history = useMemo(() => {
    const all = getScoreHistory();

    const bestScoresByUser = all.reduce((acc, entry) => {
      const currentBest = acc.get(entry.username);

      if (!currentBest) {
        acc.set(entry.username, entry);
        return acc;
      }

      const samePercentage = entry.percentage === currentBest.percentage;
      const betterRawScore = entry.correct > currentBest.correct;
      const betterStreak = entry.maxStreak > currentBest.maxStreak;

      if (
        entry.percentage > currentBest.percentage ||
        (samePercentage && betterRawScore) ||
        (samePercentage &&
          entry.correct === currentBest.correct &&
          betterStreak)
      ) {
        acc.set(entry.username, entry);
      }

      return acc;
    }, new Map());

    return [...bestScoresByUser.values()].sort((a, b) => {
      if (b.percentage !== a.percentage) return b.percentage - a.percentage;
      if (b.correct !== a.correct) return b.correct - a.correct;
      if (b.maxStreak !== a.maxStreak) return b.maxStreak - a.maxStreak;
      return a.username.localeCompare(b.username);
    });
  }, [version]);

  if (history.length === 0) {
    return <p className={styles.empty}>Nu exista scoruri salvate.</p>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headRow}>
            {headers.map((header) => (
              <th key={header} className={styles.headCell}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {history.map((entry, i) => (
            <tr
              key={i}
              className={`${styles.row} ${i === 0 ? styles.topRow : ""}`}
            >
              <td
                className={`${styles.rankCell} ${i === 0 ? styles.topRankCell : ""}`}
              >
                {i === 0 ? "I" : i === 1 ? "II" : i === 2 ? "III" : i + 1}
              </td>
              <td className={styles.userCell}>{entry.username}</td>
              <td className={styles.cell}>
                {entry.correct}/{entry.total}
              </td>
              <td
                className={`${styles.percentCell} ${
                  entry.percentage >= 80
                    ? styles.success
                    : entry.percentage >= 50
                      ? styles.warning
                      : styles.error
                }`}
              >
                {entry.percentage}%
              </td>
              <td className={styles.categoryCell}>{entry.category}</td>
              <td className={styles.cell}>{entry.maxStreak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default ScoreHistory;
