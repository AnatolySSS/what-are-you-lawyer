import type { CSSProperties } from 'react';
import type { ArchetypeProfile } from '../../types/quiz';

interface ResultCardProps {
  profile: ArchetypeProfile;
}

export function ResultCard({ profile }: ResultCardProps) {
  return (
    <article className="result-card" style={{ '--accent': profile.color } as CSSProperties}>
      <div className="result-icon">{profile.icon}</div>
      <div className="role">{profile.role}</div>
      <h2>{profile.name}</h2>
      <p>{profile.intro}</p>

      <div className="details">
        <div>
          <label>ТВОИ СИЛЬНЫЕ СТОРОНЫ</label>
          <p>{profile.strong}</p>
        </div>
        <div>
          <label>ТВОЯ ЗОНА РОСТА</label>
          <p>{profile.weak}</p>
        </div>
      </div>

      <blockquote>{profile.motto}</blockquote>
    </article>
  );
}
