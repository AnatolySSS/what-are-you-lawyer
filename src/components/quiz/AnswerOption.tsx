import { ArrowRight } from 'lucide-react';
import type { Answer } from '../../types/quiz';

interface AnswerOptionProps {
  answer: Answer;
  index: number;
  onSelect: () => void;
}

export function AnswerOption({ answer, index, onSelect }: AnswerOptionProps) {
  return (
    <button className="answer" onClick={onSelect}>
      <b>{String.fromCharCode(65 + index)}</b>
      <span>{answer.text}</span>
      <ArrowRight className="arr" size={16} />
    </button>
  );
}
