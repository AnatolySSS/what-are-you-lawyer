import { useState } from 'react';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { LandingScreen } from '../components/layout/LandingScreen';
import { QuizScreen } from '../components/quiz/QuizScreen';
import { ResultScreen } from '../components/result/ResultScreen';
import { PROFILES } from '../data/profiles';
import { useQuiz } from '../hooks/useQuiz';
import { shareResult } from '../utils/shareResult';

export default function App() {
  const quiz = useQuiz();
  const [copied, setCopied] = useState(false);
  const profile = PROFILES[quiz.winner];

  async function handleShare() {
    const wasCopied = await shareResult(profile);
    if (wasCopied) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleRestart() {
    quiz.reset();
    setCopied(false);
  }

  return (
    <div className="shell">
      <Header />
      <main>
        {!quiz.started ? (
          <LandingScreen onStart={quiz.start} />
        ) : quiz.isFinished ? (
          <ResultScreen
            profile={profile}
            scores={quiz.scores}
            showScores={quiz.showScores}
            copied={copied}
            onToggleScores={quiz.toggleScores}
            onShare={handleShare}
            onRestart={handleRestart}
          />
        ) : (
          <QuizScreen
            questionIndex={quiz.questionIndex}
            onSelectAnswer={quiz.selectAnswer}
            onBack={quiz.goBack}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
