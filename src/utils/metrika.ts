const COUNTER_ID = 114368796;

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

export function reachGoal(goal: string): void {
  if (typeof window !== "undefined" && window.ym) {
    window.ym(COUNTER_ID, "reachGoal", goal);
  }
}
