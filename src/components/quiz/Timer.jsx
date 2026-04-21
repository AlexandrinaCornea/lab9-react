import { memo } from "react";
import { useTimer } from "../../hooks/useTimer";
import styles from "./Timer.module.css";

const Timer = memo(function Timer({ duration, onExpire, active }) {
  const { timeLeft, percentage } = useTimer(duration, onExpire, active);

  if (duration === null) return null;

  const colorClass =
    percentage > 60
      ? styles.green
      : percentage > 30
        ? styles.yellow
        : styles.red;

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${styles.activeFill} ${colorClass}`}
          style={{ "--timer-width": `${percentage}%` }}
        />
      </div>
      <span className={`${styles.count} `}>Timer {timeLeft}s</span>
    </div>
  );
});

export default Timer;
