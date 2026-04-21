import { memo } from "react";
import styles from "./FormField.module.css";

const QuestionCountSelect = memo(function QuestionCountSelect({
  counts,
  value,
  onChange,
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Numar de intrebari</label>
      <select
        className={`${styles.control} ${styles.select}`}
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === "all" ? "all" : Number(val));
        }}
      >
        {counts.map((c) => (
          <option key={c} value={c}>
            {c === "all" ? "Toate disponibile" : `${c} intrebari`}
          </option>
        ))}
      </select>
    </div>
  );
});

export default QuestionCountSelect;
