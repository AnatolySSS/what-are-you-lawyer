import type { ReactNode } from 'react';

export type Archetype = 'defender' | 'strategist' | 'negotiator' | 'detective' | 'judge';

export interface Answer {
  text: string;
  kind: Archetype;
}

export interface Question {
  title: string;
  sub: string;
  answers: Answer[];
}

export interface ArchetypeProfile {
  name: string;
  role: string;
  icon: ReactNode;
  color: string;
  intro: string;
  strong: string;
  weak: string;
  motto: string;
}

export type Scores = Record<Archetype, number>;
