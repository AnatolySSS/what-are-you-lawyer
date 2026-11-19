# Какой ты юрист? — React + TypeScript

Проект разложен по модулям. Тексты вопросов, варианты ответов, архетипы и визуальное оформление сохранены; вынесены в отдельные файлы компоненты, данные, типы, хук состояния и функцию копирования результата.

## Запуск
Требуется Node.js 20+.

```bash
npm install
npm run dev
```

Откройте адрес Vite, обычно http://localhost:5173.

## Сборка

```bash
npm run build
```

Готовая статическая версия появится в `dist`.

## Публикация
Загрузите проект в GitHub и импортируйте репозиторий в Vercel.
- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite

## Структура

```text
src/
├── app/
│   └── App.tsx                 # корневой компонент и переключение экранов
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LandingScreen.tsx
│   ├── quiz/
│   │   ├── QuizScreen.tsx
│   │   ├── AnswerOption.tsx
│   │   └── ProgressBar.tsx
│   └── result/
│       ├── ResultScreen.tsx
│       ├── ResultCard.tsx
│       └── ScoreBreakdown.tsx
├── data/
│   ├── questions.ts            # вопросы и варианты
│   └── profiles.tsx            # описания пяти архетипов
├── hooks/
│   └── useQuiz.ts              # состояние и логика прохождения
├── types/
│   └── quiz.ts                 # типы викторины
├── utils/
│   └── shareResult.ts          # копирование результата
├── styles/
│   └── global.css
└── main.tsx
```

Викторина работает в браузере и не требует backend или базы данных.
