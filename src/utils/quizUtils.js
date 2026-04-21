export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getQuestions(allQuestions, category, questionCount) {
  const filtered =
    category === "Toate"
      ? allQuestions
      : allQuestions.filter((q) => q.category === category);
  const shuffled = shuffle(filtered);
  return questionCount === "all" ? shuffled : shuffled.slice(0, questionCount);
}

export function getCategories(questions) {
  return [...new Set(questions.map((q) => q.category))];
}

export function getAvailableCountsForCategory(allQuestions, category) {
  const total =
    category === "Toate"
      ? allQuestions.length
      : allQuestions.filter((q) => q.category === category).length;
  const fixed = [5, 10, 15, 20].filter((n) => n <= total);
  return [...fixed, "all"];
}

export function getCategoryStats(questions, answers) {
  const map = {};
  questions.forEach((q) => {
    if (!map[q.category]) map[q.category] = { total: 0, correct: 0 };
    map[q.category].total++;
  });
  answers.forEach((a) => {
    const q = questions.find((q) => q.id === a.questionId);
    if (q && a.isCorrect) map[q.category].correct++;
  });
  return map;
}

export function saveScoreToHistory(entry) {
  try {
    const existing = JSON.parse(
      localStorage.getItem("quiz-score-history") || "[]",
    );
    const updated = [entry, ...existing].slice(0, 30);
    localStorage.setItem("quiz-score-history", JSON.stringify(updated));
  } catch (e) {
    console.error("saveScoreToHistory error:", e);
  }
}

export function getScoreHistory() {
  try {
    return JSON.parse(localStorage.getItem("quiz-score-history") || "[]");
  } catch {
    return [];
  }
}
