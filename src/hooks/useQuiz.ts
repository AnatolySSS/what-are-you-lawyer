import { useMemo, useState } from 'react';
import { ARCHETYPE_ORDER, QUESTIONS } from '../data/questions';
import type { Archetype, Scores } from '../types/quiz';

export function useQuiz() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Archetype[]>([]);
  const [showScores, setShowScores] = useState(false);

  const scores = useMemo<Scores>(() => {
    return ARCHETYPE_ORDER.reduce((result, archetype) => {
      result[archetype] = answers.filter((answer) => answer === archetype).length;
      return result;
    }, {} as Scores);
  }, [answers]);

  const winner = ARCHETYPE_ORDER.reduce(
    (best, archetype) => scores[archetype] > scores[best] ? archetype : best,
    ARCHETYPE_ORDER[0],
  );

  const isFinished = answers.length === QUESTIONS.length;

  function start() {
    setStarted(true);
  }

  function selectAnswer(archetype: Archetype) {
    setAnswers((current) => [...current.slice(0, questionIndex), archetype]);
    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex((current) => current + 1);
    }
  }

  function goBack() {
    if (questionIndex === 0) {
      setStarted(false);
      return;
    }
    setQuestionIndex((current) => current - 1);
  }

  function toggleScores() {
    setShowScores((current) => !current);
  }

  function reset() {
    setStarted(false);
    setQuestionIndex(0);
    setAnswers([]);
    setShowScores(false);
  }

  return {
    started,
    questionIndex,
    answers,
    scores,
    winner,
    isFinished,
    showScores,
    start,
    selectAnswer,
    goBack,
    toggleScores,
    reset,
  };
}
