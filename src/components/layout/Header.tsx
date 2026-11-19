import { Scale } from 'lucide-react';

export function Header() {
  return (
    <header>
      <div className="brand">
        <span><Scale size={19} /></span> ПРАВО<span className="gold">.</span>ПРОФИЛЬ
      </div>
      <small>НЕБОЛЬШОЙ ТЕСТ · БОЛЬШОЕ САМООПОЗНАНИЕ</small>
    </header>
  );
}
