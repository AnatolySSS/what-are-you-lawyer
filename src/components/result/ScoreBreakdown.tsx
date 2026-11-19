import type { Archetype, Scores } from '../../types/quiz';
import { ARCHETYPE_ORDER } from '../../data/questions';
import { PROFILES } from '../../data/profiles';

interface ScoreBreakdownProps {
  scores: Scores;
}

export function ScoreBreakdown({ scores }: ScoreBreakdownProps) {
  return (
    <div className="scores">
      {ARCHETYPE_ORDER.map((archetype: Archetype) => (
        <div className="score" key={archetype}>
          <span>{PROFILES[archetype].name}</span>
          <div>
            <i
              style={{
                width: `${(scores[archetype] / 8) * 100}%`,
                background: PROFILES[archetype].color,
              }}
            />
          </div>
          <b>{scores[archetype]}</b>
        </div>
      ))}
    </div>
  );
}
