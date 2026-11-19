import { ArrowRight, Scale, Sparkles } from "lucide-react";

interface LandingScreenProps {
  onStart: () => void;
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <section className="hero">
      <div className="eyebrow">
        <Sparkles size={14} /> ЮРИДИЧЕСКИЙ ХАРАКТЕР
      </div>
      <div className="seal">
        <Scale size={52} />
      </div>
      <h1>
        Какой ты
        <br />
        <em>юрист?</em>
      </h1>
      <p className="lead">
        За каждым сильным юристом стоит свой стиль мышления. Узнай, кто ты в мире права: защитник, стратег,
        переговорщик, детектив или судья.
      </p>
      <div className="meta">
        <span>● 8 ситуационных вопросов</span>
        <span>● 2–3 минуты</span>
        <span>● 5 архетипов</span>
      </div>
      <button className="primary" onClick={onStart}>
        Узнать свой тип <ArrowRight size={18} />
      </button>
      <p className="note">
        Развлекательный тест, а не психологическая диагностика или оценка профессиональной квалификации.
      </p>
    </section>
  );
}
