import { memo } from "react";
import styles from "./ScoreSummary.module.css";

export const ScoreSummary = memo(function ScoreSummary({
  username,
  correct,
  total,
  maxStreak,
}) {
  const pct = Math.round((correct / total) * 100);
  const textSummary =
    pct >= 80
      ? "Super!!!"
      : pct >= 60
        ? "It's fine"
        : pct >= 40
          ? "It's ok"
          : "Maybe next time";

  return (
    <div className={styles.summary}>
      <div className={styles.headline}>{textSummary}</div>
      <h2 className={styles.title}>Bravo, {username}!</h2>
      <p className={styles.subtitle}>Ai terminat quiz-ul</p>
      <div className={styles.stats}>
        <StatBox label="Scor" value={`${correct}/${total}`} accent />
        <StatBox label="Procentaj" value={`${pct}%`} accent />
        <StatBox label="Streak maxim" value={`${maxStreak}`} />
      </div>
    </div>
  );
});

function StatBox({ label, value, accent }) {
  return (
    <div className={`${styles.statBox} ${accent ? styles.statBoxAccent : ""}`}>
      <div className={`${styles.statValue} ${accent ? styles.statValueAccent : ""}`}>
        {value}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}
