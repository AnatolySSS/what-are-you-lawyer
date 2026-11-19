import type { ArchetypeProfile } from "../types/quiz";

const WIDTH = 1200;
const HEIGHT = 1500;

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 4,
) {
  const words = text.split(/\s+/);
  let line = "";
  let lines = 0;

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      ctx.fillText(line, x, y + lines * lineHeight);
      lines += 1;
      line = word;
      if (lines >= maxLines - 1) break;
    } else {
      line = candidate;
    }
  }

  const remaining = words.slice(words.indexOf(line.split(" ")[0])).join(" ");
  const finalLine = lines >= maxLines - 1 && remaining.length > line.length ? `${line.replace(/[.…]*$/, "")}…` : line;
  if (lines < maxLines) ctx.fillText(finalLine, x, y + lines * lineHeight);
}

function drawSection(ctx: CanvasRenderingContext2D, label: string, text: string, x: number, y: number, accent: string) {
  ctx.fillStyle = accent;
  ctx.font = "700 21px Arial, sans-serif";
  ctx.fillText(label.toUpperCase(), x, y);
  ctx.fillStyle = "#c0cad6";
  ctx.font = "400 25px Arial, sans-serif";
  drawWrappedText(ctx, text, x, y + 43, 890, 36, 3);
}

async function createResultImage(profile: ArchetypeProfile): Promise<File> {
  await document.fonts?.ready;

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Не удалось создать изображение");

  const background = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  background.addColorStop(0, "#1c2b41");
  background.addColorStop(1, "#0b1320");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Декоративное золотое свечение и рамка карточки.
  const glow = ctx.createRadialGradient(900, 180, 20, 900, 180, 650);
  glow.addColorStop(0, `${profile.color}30`);
  glow.addColorStop(1, "#1c2b4100");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  roundedRect(ctx, 58, 58, WIDTH - 116, HEIGHT - 116, 30);
  ctx.strokeStyle = `${profile.color}99`;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "#d4b77d";
  ctx.font = "700 22px Arial, sans-serif";
  ctx.fillText("ТЕСТ «КАКОЙ ТЫ ЮРИСТ?»", WIDTH / 2, 145);

  ctx.beginPath();
  ctx.arc(WIDTH / 2, 285, 76, 0, Math.PI * 2);
  ctx.fillStyle = `${profile.color}18`;
  ctx.fill();
  ctx.strokeStyle = profile.color;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = profile.color;
  ctx.font = "64px Arial, sans-serif";
  ctx.fillText("§", WIDTH / 2, 307);

  ctx.fillStyle = profile.color;
  ctx.font = "700 22px Arial, sans-serif";
  ctx.fillText(profile.role.toUpperCase(), WIDTH / 2, 430);

  ctx.fillStyle = "#f4f2ed";
  ctx.font = "500 58px Georgia, serif";
  const titleWords = profile.name.split(" ");
  let titleLine = "";
  const titleLines: string[] = [];
  for (const word of titleWords) {
    const next = titleLine ? `${titleLine} ${word}` : word;
    if (ctx.measureText(next).width > 980 && titleLine) {
      titleLines.push(titleLine);
      titleLine = word;
    } else titleLine = next;
  }
  if (titleLine) titleLines.push(titleLine);
  titleLines.forEach((line, index) => ctx.fillText(line, WIDTH / 2, 520 + index * 72));

  ctx.fillStyle = "#b8c2ce";
  ctx.font = "400 27px Arial, sans-serif";
  drawWrappedText(ctx, profile.intro, WIDTH / 2, 660, 900, 42, 4);

  ctx.textAlign = "left";
  ctx.strokeStyle = "#ffffff25";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(145, 850);
  ctx.lineTo(WIDTH - 145, 850);
  ctx.stroke();

  drawSection(ctx, "Сильные стороны", profile.strong, 145, 920, profile.color);
  drawSection(ctx, "Зона роста", profile.weak, 145, 1085, profile.color);

  roundedRect(ctx, 125, 1250, WIDTH - 250, 125, 16);
  ctx.fillStyle = "#ffffff0d";
  ctx.fill();
  ctx.fillStyle = "#f1e4c8";
  ctx.textAlign = "center";
  ctx.font = "italic 30px Georgia, serif";
  drawWrappedText(ctx, profile.motto, WIDTH / 2, 1325, 900, 40, 2);

  ctx.fillStyle = "#8290a2";
  ctx.font = "400 18px Arial, sans-serif";
  ctx.fillText("Развлекательный тест · Не является профессиональной оценкой", WIDTH / 2, 1410);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result);
      else reject(new Error("Не удалось сформировать PNG"));
    }, "image/png");
  });

  return new File([blob], "moy-yuridicheskiy-arhetip.png", { type: "image/png" });
}

function downloadImage(file: File) {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Отдельное скачивание PNG-карточки.
export async function downloadResult(profile: ArchetypeProfile): Promise<void> {
  const file = await createResultImage(profile);
  downloadImage(file);
}

export type ShareResultStatus = "shared" | "downloaded" | "cancelled";

/** Создаёт PNG-карточку и открывает системное меню отправки, если оно поддерживается. */
export async function shareResult(profile: ArchetypeProfile): Promise<ShareResultStatus> {
  const file = await createResultImage(profile);

  if (navigator.canShare?.({ files: [file] }) && navigator.share) {
    try {
      await navigator.share({
        title: `Мой результат — ${profile.name}`,
        text: `Мой результат в тесте «Какой ты юрист?» — ${profile.name}. А какой ты юрист?`,
        files: [file],
      });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return "cancelled";
      // Если браузер не смог передать файл, сохраняем PNG локально.
    }
  }

  downloadImage(file);
  return "downloaded";
}
