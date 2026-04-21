import { memo } from "react";
import AnswerOption from "./AnswerOption";
import styles from "./QuestionCard.module.css";

const QuestionCard = memo(function QuestionCard({
  question,
  selectedIndex,
  isAnswered,
  onAnswer,
}) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{question.question}</h2>

      <div className={styles.options}>
        {question.options.map((opt, i) => (
          <AnswerOption
            key={i}
            text={opt}
            index={i}
            selectedIndex={selectedIndex}
            correctIndex={question.correct}
            isAnswered={isAnswered}
            onClick={onAnswer}
          />
        ))}
      </div>
    </div>
  );
});

export default QuestionCard;
