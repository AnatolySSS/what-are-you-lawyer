import { ArrowLeft } from 'lucide-react';
import { QUESTIONS } from '../../data/questions';
import type { Archetype } from '../../types/quiz';
import { AnswerOption } from './AnswerOption';
import { ProgressBar } from './ProgressBar';

interface QuizScreenProps {
  questionIndex: number;
  onSelectAnswer: (archetype: Archetype) => void;
  onBack: () => void;
}

export function QuizScreen({ questionIndex, onSelectAnswer, onBack }: QuizScreenProps) {
  const question = QUESTIONS[questionIndex];

  return (
    <section className="quiz">
      <div className="quiz-top">
        <span className="eyebrow">ТЕСТ НА ЮРИДИЧЕСКИЙ ТИП</span>
        <small>ВОПРОС <b>{questionIndex + 1}</b> / {QUESTIONS.length}</small>
      </div>

      <ProgressBar current={questionIndex + 1} total={QUESTIONS.length} />

      <div className="num">0{questionIndex + 1}</div>
      <h2>{question.title}</h2>
      <p className="sub">{question.sub}</p>

      <div className="answers">
        {question.answers.map((answer, index) => (
          <AnswerOption
            key={answer.kind}
            answer={answer}
            index={index}
            onSelect={() => onSelectAnswer(answer.kind)}
          />
        ))}
      </div>

      <div className="quiz-bottom">
        <button onClick={onBack}><ArrowLeft size={15} /> Назад</button>
        <span>Выбери один вариант ответа</span>
      </div>
    </section>
  );
}
