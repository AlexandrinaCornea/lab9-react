import { useEffect, useMemo, useCallback, useRef, useState } from "react";
import { useQuiz } from "../../context/QuizContext";
import { saveScoreToHistory } from "../../utils/quizUtils";
import Button from "../common/Button";
import ThemeToggle from "../common/ThemeToggle";
import { ScoreSummary } from "./ScoreSummary";
import CategoryBreakdown from "./CategoryBreakdown";
import AnswerReview from "./AnswerReview";
import ScoreHistory from "./ScoreHistory";
import styles from "./ResultsPage.module.css";

export default function ResultsPage() {
  const { state, dispatch } = useQuiz();
  const { username, questions, answers, maxStreak, config } = state;

  const correct = useMemo(
    () => answers.filter((a) => a.isCorrect).length,
    [answers],
  );
  const total = questions.length;
  const hasSavedScore = useRef(false);
  const [historyVersion, setHistoryVersion] = useState(0);

  useEffect(() => {
    if (hasSavedScore.current || !total) return;

    saveScoreToHistory({
      username,
      correct,
      total,
      percentage: Math.round((correct / total) * 100),
      category: config.category,
      maxStreak,
    });
    hasSavedScore.current = true;
    setHistoryVersion((version) => version + 1);
  }, [username, correct, total, config.category, maxStreak]);

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.logo}> QuizMaster</span>
        <ThemeToggle />
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <ScoreSummary
            username={username}
            correct={correct}
            total={total}
            maxStreak={maxStreak}
          />

          <section>
            <CategoryBreakdown questions={questions} answers={answers} />
          </section>

          <section>
            <h3 className={styles.sectionTitle}>Revizuire Răspunsuri</h3>
            <AnswerReview questions={questions} answers={answers} />
          </section>

          <section>
            <h3 className={styles.sectionTitle}>Clasament</h3>
            <ScoreHistory version={historyVersion} />
          </section>

          <Button onClick={handleReset} size="lg" fullWidth>
            Mai încearcă!
          </Button>
        </div>
      </main>
    </div>
  );
}
