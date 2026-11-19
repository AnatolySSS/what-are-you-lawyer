import { Copy, RotateCcw, Sparkles } from 'lucide-react';
import type { ArchetypeProfile, Scores } from '../../types/quiz';
import { ResultCard } from './ResultCard';
import { ScoreBreakdown } from './ScoreBreakdown';

interface ResultScreenProps {
  profile: ArchetypeProfile;
  scores: Scores;
  showScores: boolean;
  copied: boolean;
  onToggleScores: () => void;
  onShare: () => void;
  onRestart: () => void;
}

export function ResultScreen({
  profile,
  scores,
  showScores,
  copied,
  onToggleScores,
  onShare,
  onRestart,
}: ResultScreenProps) {
  return (
    <section className="result">
      <div className="eyebrow"><Sparkles size={14} /> ТВОЙ ЮРИДИЧЕСКИЙ АРХЕТИП</div>
      <ResultCard profile={profile} />

      <button className="toggle" onClick={onToggleScores}>
        {showScores ? 'Скрыть' : 'Посмотреть'} распределение ответов
        <b>{showScores ? '−' : '+'}</b>
      </button>

      {showScores && <ScoreBreakdown scores={scores} />}

      <div className="actions">
        <button className="primary" onClick={onShare}>
          <Copy size={16} />
          {copied ? 'Скопировано!' : 'Поделиться результатом'}
        </button>
        <button className="secondary" onClick={onRestart}>
          <RotateCcw size={16} /> Пройти ещё раз
        </button>
      </div>

      <p className="note">
        Результат отражает ответы в этой игровой викторине и не является профессиональным заключением.
      </p>
    </section>
  );
}
