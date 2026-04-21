import { useState, useMemo, useCallback } from "react";
import { useQuiz } from "../../context/QuizContext";
import {
  getCategories,
  getAvailableCountsForCategory,
} from "../../utils/quizUtils";
import allQuestions from "../../data/questions.json";
import Button from "../common/Button";
import ThemeToggle from "../common/ThemeToggle";
import UsernameInput from "./UsernameInput";
import CategorySelect from "./CategorySelect";
import QuestionCountSelect from "./QuestionCountSelect";
import TimeLimitSelect from "./TimeLimitSelect";
import styles from "./StartPage.module.css";

export default function StartPage() {
  const { dispatch } = useQuiz();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [category, setCategory] = useState("Toate");
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(20);

  const categories = useMemo(() => getCategories(allQuestions), []);
  const availableCounts = useMemo(
    () => getAvailableCountsForCategory(allQuestions, category),
    [category],
  );

  const handleCategoryChange = useCallback(
    (cat) => {
      setCategory(cat);
      const counts = getAvailableCountsForCategory(allQuestions, cat);
      if (!counts.includes(questionCount)) {
        setQuestionCount(counts[0]);
      }
    },
    [questionCount],
  );

  const handleSubmit = useCallback(() => {
    if (!username.trim()) {
      setUsernameError("Numele nu poate fi gol!");
      return;
    }
    setUsernameError("");
    dispatch({
      type: "START_QUIZ",
      payload: {
        username: username.trim(),
        config: { category, questionCount, timeLimit },
      },
    });
  }, [username, category, questionCount, timeLimit, dispatch]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.logo}>QuizMaster</h1>
        <ThemeToggle />
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.title}>Configurează Quiz-ul</h2>
          <p className={styles.subtitle}>Alege setările și pornește!</p>

          <div className={styles.form}>
            <UsernameInput
              value={username}
              onChange={setUsername}
              error={usernameError}
            />
            <CategorySelect
              categories={categories}
              value={category}
              onChange={handleCategoryChange}
            />
            <QuestionCountSelect
              counts={availableCounts}
              value={questionCount}
              onChange={setQuestionCount}
            />
            <TimeLimitSelect value={timeLimit} onChange={setTimeLimit} />

            <Button onClick={handleSubmit} size="lg" fullWidth>
              Pornește Quiz-ul
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
