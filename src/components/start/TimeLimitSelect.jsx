import { memo } from "react";
import styles from "./FormField.module.css";

const timeOptions = [
  { value: null, label: "Nelimitat" },
  { value: 10, label: "10 secunde" },
  { value: 15, label: "15 secunde" },
  { value: 20, label: "20 secunde" },
  { value: 30, label: "30 secunde" },
];

const TimeLimitSelect = memo(function TimeLimitSelect({ value, onChange }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Timp per intrebare</label>
      <select
        className={`${styles.control} ${styles.select}`}
        value={value ?? "null"}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === "null" ? null : Number(val));
        }}
      >
        {timeOptions.map((opt) => (
          <option key={String(opt.value)} value={opt.value ?? "null"}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default TimeLimitSelect;
