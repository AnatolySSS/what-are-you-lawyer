import { Download, Share2, RotateCcw, Sparkles } from "lucide-react";
import type { ArchetypeProfile, Scores } from "../../types/quiz";
import type { ShareResultStatus } from "../../utils/shareResult";
import { ResultCard } from "./ResultCard";
import { ScoreBreakdown } from "./ScoreBreakdown";
import { reachGoal } from "../../utils/metrika";

interface ResultScreenProps {
  profile: ArchetypeProfile;
  scores: Scores;
  showScores: boolean;
  shareStatus: ShareResultStatus | null;
  onToggleScores: () => void;
  onShare: () => void;
  onDownload: () => void;
  onRestart: () => void;
}

export function ResultScreen({
  profile,
  scores,
  showScores,
  shareStatus,
  onToggleScores,
  onShare,
  onDownload,
  onRestart,
}: ResultScreenProps) {
  reachGoal("quiz_complete");

  return (
    <section className="result">
      <div className="eyebrow">
        <Sparkles size={14} /> ТВОЙ ЮРИДИЧЕСКИЙ АРХЕТИП
      </div>
      <ResultCard profile={profile} />

      <button className="toggle" onClick={onToggleScores}>
        {showScores ? "Скрыть" : "Посмотреть"} распределение ответов
        <b>{showScores ? "−" : "+"}</b>
      </button>

      {showScores && <ScoreBreakdown scores={scores} />}

      <div className="actions">
        <button className="primary" onClick={onShare}>
          <Share2 size={16} />
          {shareStatus === "shared" ? "Отправлено" : "Поделиться карточкой"}
        </button>

        <button className="secondary" onClick={onDownload}>
          <Download size={16} />
          {shareStatus === "downloaded" ? "Карточка скачана" : "Скачать PNG"}
        </button>

        <button className="secondary" onClick={onRestart}>
          <RotateCcw size={16} /> Пройти ещё раз
        </button>
      </div>

      <p className="note">
        {shareStatus === "downloaded"
          ? "PNG сохранён. Прикрепи его к письму или загрузи в публикацию VK."
          : "Можно отправить карточку через меню устройства или скачать PNG для публикации."}
        <br />
        Результат не является профессиональным заключением.
      </p>
    </section>
  );
}
