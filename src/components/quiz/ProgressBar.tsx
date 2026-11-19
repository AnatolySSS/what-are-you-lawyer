interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="progress">
      <i style={{ width: `${(current / total) * 100}%` }} />
    </div>
  );
}
