import type { ArchetypeProfile } from '../types/quiz';

export async function shareResult(profile: ArchetypeProfile): Promise<boolean> {
  const text = `Мой результат в тесте «Какой ты юрист?» — ${profile.name}. ${profile.role}. ${profile.motto}А какой ты юрист?`;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    window.prompt('Скопируй результат', text);
    return false;
  }
}
