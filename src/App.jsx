import { useQuiz } from "./context/QuizContext";
import StartPage from "./components/start/StartPage";
import QuizPage from "./components/quiz/QuizPage";
import ResultsPage from "./components/results/ResultsPage";

export default function App() {
  const { state } = useQuiz();
  const { phase } = state;

  return (
    <>
      {phase === "start" && <StartPage />}
      {phase === "quiz" && <QuizPage />}
      {phase === "results" && <ResultsPage />}
    </>
  );
}
