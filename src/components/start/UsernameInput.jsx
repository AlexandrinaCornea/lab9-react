import { memo } from "react";
import styles from "./FormField.module.css";

const UsernameInput = memo(function UsernameInput({ value, onChange, error }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Numele tau</label>
      <input
        className={`${styles.control} ${styles.input} ${error ? styles.inputError : ""}`}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Introdu numele tau..."
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
});

export default UsernameInput;
