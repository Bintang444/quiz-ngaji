import { useState } from 'react';

function toTwemoji(emoji: string): string {
  const cps = [...emoji]
    .map((c) => c.codePointAt(0)!.toString(16))
    .filter((cp) => cp !== 'fe0f')
    .join('-');
  return `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${cps}.svg`;
}

export default function GambarSoal({ emoji }: { emoji: string }) {
  const [gagal, setGagal] = useState(false);

  if (gagal) {
    return <span className="text-6xl drop-shadow-md animate-bounce-slow">{emoji}</span>;
  }

  return (
    <img
      src={toTwemoji(emoji)}
      alt={emoji}
      draggable={false}
      onError={() => setGagal(true)}
      className="w-16 h-16 md:w-20 md:h-20"
    />
  );
}