import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getQuestions } from "../utils/quizUtils";
import allQuestions from "../data/questions.json";

const initialState = {
  phase: "start",
  username: "",
  config: null,
  questions: [],
  currentIndex: 0,
  answers: [],
  streak: 0,
  maxStreak: 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "START_QUIZ": {
      const questions = getQuestions(
        allQuestions,
        action.payload.config.category,
        action.payload.config.questionCount,
      );
      return {
        ...initialState,
        phase: "quiz",
        username: action.payload.username,
        config: action.payload.config,
        questions,
      };
    }

    case "ANSWER_QUESTION": {
      const {
        questionId,
        selectedIndex,
        isCorrect,
        timedOut = false,
      } = action.payload;
      const newStreak = isCorrect ? state.streak + 1 : 0;
      const newMaxStreak = Math.max(state.maxStreak, newStreak);
      const newAnswers = [
        ...state.answers,
        { questionId, selectedIndex, isCorrect, timedOut },
      ];
      const isLast = state.currentIndex === state.questions.length - 1;
      return {
        ...state,
        answers: newAnswers,
        streak: newStreak,
        maxStreak: newMaxStreak,
        currentIndex: isLast ? state.currentIndex : state.currentIndex + 1,
        phase: isLast ? "results" : "quiz",
      };
    }

    case "RESET":
      return { ...initialState };

    case "RESTORE_SESSION":
      return { ...action.payload };

    default:
      return state;
  }
}

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  const [savedSession, setSavedSession, removeSavedSession] = useLocalStorage(
    "quiz-session",
    null,
  );

  const [state, dispatch] = useReducer(quizReducer, initialState, () => {
    if (savedSession && savedSession.phase !== "start") {
      return savedSession;
    }
    return initialState;
  });

  useEffect(() => {
    if (state.phase === "start") {
      removeSavedSession();
      return;
    }

    setSavedSession(state);
  }, [state, setSavedSession, removeSavedSession]);

  const dispatchAction = useCallback((action) => {
    dispatch(action);
  }, []);

  return (
    <QuizContext.Provider value={{ state, dispatch: dispatchAction }}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => useContext(QuizContext);
