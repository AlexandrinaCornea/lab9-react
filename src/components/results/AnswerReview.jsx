import { useState, useMemo, useCallback } from "react";
import AnswerCard from "./AnswerCard";
import styles from "./AnswerReview.module.css";

const TABS = ["Toate", "Corecte", "Gresite"];

export default function AnswerReview({ questions, answers }) {
  const [activeTab, setActiveTab] = useState("Toate");
  const [filterCategory, setFilterCategory] = useState("Toate");

  const categories = useMemo(
    () => ["Toate", ...new Set(questions.map((q) => q.category))],
    [questions],
  );

  const filtered = useMemo(() => {
    return answers
      .map((ans, i) => ({ ans, q: questions[i], i }))
      .filter(({ ans, q }) => {
        const tabOk =
          activeTab === "Toate" ||
          (activeTab === "Corecte" && ans.isCorrect) ||
          (activeTab === "Gresite" && !ans.isCorrect);
        const catOk =
          filterCategory === "Toate" || q.category === filterCategory;
        return tabOk && catOk;
      });
  }, [answers, questions, activeTab, filterCategory]);

  const handleTabChange = useCallback((tab) => setActiveTab(tab), []);
  const handleCatChange = useCallback(
    (e) => setFilterCategory(e.target.value),
    [],
  );

  return (
    <div>
      <div className={styles.toolbar}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
          >
            {tab}
          </button>
        ))}

        <select
          className={styles.select}
          value={filterCategory}
          onChange={handleCatChange}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.list}>
        {filtered.length === 0 ? (
          <p className={styles.empty}>Nicio inregistrare gasita.</p>
        ) : (
          filtered.map(({ ans, q, i }) => (
            <AnswerCard key={q.id} question={q} answer={ans} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
