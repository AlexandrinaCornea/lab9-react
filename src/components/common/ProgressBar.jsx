import { memo } from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = memo(function ProgressBar({ value, max, label }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${styles.activeFill}`}
          style={{ "--progress-width": `${pct}%` }}
        />
      </div>
      <span className={styles.count}>
        {value}/{max}
      </span>
    </div>
  );
});

export default ProgressBar;
