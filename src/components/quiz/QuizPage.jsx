import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuiz } from "../../context/QuizContext";
import ThemeToggle from "../common/ThemeToggle";
import QuizProgress from "./QuizProgress";
import Timer from "./Timer";
import StreakCounter from "./StreakCounter";
import QuestionCard from "./QuestionCard";
import styles from "./QuizPage.module.css";

export default function QuizPage() {
  const { state, dispatch } = useQuiz();
  const { questions, currentIndex, streak, config } = state;

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = useMemo(
    () => questions[currentIndex],
    [questions, currentIndex],
  );

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentIndex]);

  const submitAnswer = useCallback(
    (index, timedOut = false) => {
      const isCorrect = !timedOut && index === currentQuestion.correct;
      setTimeout(
        () => {
          dispatch({
            type: "ANSWER_QUESTION",
            payload: {
              questionId: currentQuestion.id,
              selectedIndex: timedOut ? null : index,
              isCorrect,
              timedOut,
            },
          });
        },
        timedOut ? 800 : 1200,
      );
    },
    [currentQuestion, dispatch],
  );

  const handleAnswer = useCallback(
    (index) => {
      if (isAnswered) return;
      setSelectedAnswer(index);
      setIsAnswered(true);
      submitAnswer(index, false);
    },
    [isAnswered, submitAnswer],
  );

  const handleTimeout = useCallback(() => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(null);
    submitAnswer(null, true);
  }, [isAnswered, submitAnswer]);

  if (!currentQuestion) return null;

  const progressPercent = (currentIndex / questions.length) * 100;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.logo}>QuizMaster</span>
        <div className={styles.headerControls}>
          <StreakCounter streak={streak} />
          <ThemeToggle />
        </div>
      </header>

      <div className={styles.globalProgress}>
        <div
          className={styles.globalProgressFill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.meta}>
            <QuizProgress
              currentIndex={currentIndex}
              total={questions.length}
              category={currentQuestion.category}
              difficulty={currentQuestion.difficulty}
            />
          </div>

          <Timer
            key={currentIndex}
            duration={config.timeLimit}
            onExpire={handleTimeout}
            active={!isAnswered}
          />

          <QuestionCard
            question={currentQuestion}
            selectedIndex={selectedAnswer}
            isAnswered={isAnswered}
            onAnswer={handleAnswer}
          />

          {isAnswered && !currentQuestion && (
            <p className={styles.nextMessage}>Se trece la urmatoarea intrebare...</p>
          )}
        </div>
      </main>
    </div>
  );
}
