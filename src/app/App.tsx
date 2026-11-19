import { useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { LandingScreen } from "../components/layout/LandingScreen";
import { QuizScreen } from "../components/quiz/QuizScreen";
import { ResultScreen } from "../components/result/ResultScreen";
import { PROFILES } from "../data/profiles";
import { useQuiz } from "../hooks/useQuiz";
import { shareResult, downloadResult, type ShareResultStatus } from "../utils/shareResult";

export default function App() {
  const quiz = useQuiz();
  const [shareStatus, setShareStatus] = useState<ShareResultStatus | null>(null);
  const profile = PROFILES[quiz.winner];

  async function handleShare() {
    const status = await shareResult(profile);
    setShareStatus(status);
    if (status !== "cancelled") {
      window.setTimeout(() => setShareStatus(null), 4000);
    }
  }

  async function handleDownload() {
    await downloadResult(profile);

    setShareStatus("downloaded");

    window.setTimeout(() => {
      setShareStatus(null);
    }, 4000);
  }

  function handleRestart() {
    quiz.reset();
    setShareStatus(null);
  }

  return (
    <div className="shell">
      <Header />
      <main className="main">
        {!quiz.started ? (
          <LandingScreen onStart={quiz.start} />
        ) : quiz.isFinished ? (
          <ResultScreen
            profile={profile}
            scores={quiz.scores}
            showScores={quiz.showScores}
            shareStatus={shareStatus}
            onToggleScores={quiz.toggleScores}
            onShare={handleShare}
            onDownload={handleDownload}
            onRestart={handleRestart}
          />
        ) : (
          <QuizScreen questionIndex={quiz.questionIndex} onSelectAnswer={quiz.selectAnswer} onBack={quiz.goBack} />
        )}
      </main>
      <Footer />
    </div>
  );
}
