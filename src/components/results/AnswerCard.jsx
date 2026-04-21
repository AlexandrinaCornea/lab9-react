import { memo } from "react";
import Badge from "../common/Badge";
import styles from "./AnswerCard.module.css";

const AnswerCard = memo(function AnswerCard({ question, answer, index }) {
  const { isCorrect, selectedIndex, timedOut } = answer;

  return (
    <div
      className={`${styles.card} ${isCorrect ? styles.correct : styles.wrong}`}
    >
      <div className={styles.header}>
        <span className={styles.num}>#{index + 1}</span>
        <Badge variant={question.difficulty}>{question.difficulty}</Badge>
        <Badge variant="category">{question.category}</Badge>
        <span className={styles.status}>{isCorrect ? "Corect" : "Gresit"}</span>
      </div>

      <p className={styles.question}>{question.question}</p>

      <div className={styles.answers}>
        {timedOut && <span className={styles.timedOut}>Timp expirat</span>}
        {!timedOut && selectedIndex !== null && (
          <span className={styles.given}>
            Raspunsul tău: {question.options[selectedIndex]}
          </span>
        )}
        {!isCorrect && (
          <span className={styles.correctAnswer}>
            Raspuns corect: {question.options[question.correct]}
          </span>
        )}
      </div>
    </div>
  );
});

export default AnswerCard;
