import { memo, useCallback } from "react";
import styles from "./AnswerOption.module.css";

const AnswerOption = memo(function AnswerOption({
  text,
  index,
  selectedIndex,
  correctIndex,
  isAnswered,
  onClick,
}) {
  const isSelected = selectedIndex === index;
  const isCorrect = correctIndex === index;

  let stateClass = "";
  if (isAnswered) {
    if (isCorrect) stateClass = styles.correct;
    else if (isSelected) stateClass = styles.wrong;
    else stateClass = styles.dimmed;
  }

  const handleClick = useCallback(() => {
    if (!isAnswered) onClick(index);
  }, [isAnswered, onClick, index]);

  return (
    <button
      className={`${styles.option} ${stateClass}`}
      onClick={handleClick}
      disabled={isAnswered}
    >
      <span className={styles.letter}>{index + 1}</span>
      <span className={styles.text}>{text}</span>
      {isAnswered && isCorrect && <span className={styles.icon}>Correct</span>}
      {isAnswered && isSelected && !isCorrect && (
        <span className={styles.icon}>Wrong</span>
      )}
    </button>
  );
});

export default AnswerOption;
