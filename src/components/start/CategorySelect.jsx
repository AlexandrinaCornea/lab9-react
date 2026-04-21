import { memo } from "react";
import styles from "./FormField.module.css";

const CategorySelect = memo(function CategorySelect({
  categories,
  value,
  onChange,
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Categorie</label>
      <select
        className={`${styles.control} ${styles.select}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="Toate">Toate categoriile</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
});

export default CategorySelect;
