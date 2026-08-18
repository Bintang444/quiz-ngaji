import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Dices, Sparkles, Swords } from 'lucide-react';

type Rarity = 'ur' | 'sr' | 'r' | 'c';

interface Props {
  gachaNameDisplay: string;
  isSpinning: boolean;
  hasSpun: boolean;
  putarGacha: () => void;
  masukKeSoalGiliran: () => void;
  resetGame: () => void;
}

const RARITY_WEIGHTS: [Rarity, number][] = [
  ['ur', 2],
  ['sr', 8],
  ['r', 30],
  ['c', 60],
];

function pilihRarity(): Rarity {
  const total = RARITY_WEIGHTS.reduce((acc, [, w]) => acc + w, 0);
  let rand = Math.random() * total;
  for (const [rarity, w] of RARITY_WEIGHTS) {
    rand -= w;
    if (rand <= 0) return rarity;
  }
  return 'c';
}

const RARITY_LABEL: Record<Rarity, string> = { ur: 'ULTRA RARE', sr: 'SUPER RARE', r: 'RARE', c: 'COMMON' };
const RARITY_COLOR: Record<Rarity, string> = { ur: '#ffdf00', sr: '#a855f7', r: '#22d3ee', c: '#94a3b8' };

export default function GachaScreen({ gachaNameDisplay, isSpinning, hasSpun, putarGacha, masukKeSoalGiliran, resetGame }: Props) {
  const [rarity, setRarity] = useState<Rarity | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed || isSpinning || !hasSpun) return;
    setRevealed(true);
    const r = pilihRarity();
    setRarity(r);

    const flash = document.getElementById('flashBang');
    if (flash) {
      flash.classList.add('is-flashing');
      setTimeout(() => flash.classList.remove('is-flashing'), 250);
    }

    const colors = ['#ffdf00', '#a855f7', '#22d3ee', '#f59e0b'];
    const isUr = r === 'ur';
    confetti({
      particleCount: isUr ? 180 : 90,
      spread: isUr ? 110 : 70,
      origin: { y: 0.6 },
      colors: [...colors, RARITY_COLOR[r]],
      ticks: 200,
    });
    setTimeout(() => {
      confetti({ particleCount: 40, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: [RARITY_COLOR[r]] });
      confetti({ particleCount: 40, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: [RARITY_COLOR[r]] });
    }, 250);
  }, [isSpinning, hasSpun, revealed]);

  const rarityBg = rarity ? `bg-${rarity}` : 'bg-slate-300';
  const auraClass = rarity ? `aura-${rarity}` : '';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10">
      <div className="bg-white/95 p-6 md:p-10 rounded-[2rem] shadow-2xl w-full max-w-lg text-center border border-white/60 relative overflow-hidden">
        <h2 className="text-2xl md:text-4xl font-black mb-6 md:mb-8 tracking-tight drop-shadow-sm relative z-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600">
            GILIRAN SIAPA YA?
          </span>
        </h2>

        <div className="relative z-10 flex justify-center my-6 md:my-8">
          <div className="relative w-64 md:w-72">
            <div className={`epic-aura ${auraClass}`} />

            <div className={`${rarityBg} p-[3px] rounded-[1.4rem] transition-all duration-500 ${isSpinning ? 'bg-slate-300' : ''}`}>
              <div className={`relative bg-gradient-to-b from-white to-indigo-100 rounded-[1.2rem] overflow-hidden aspect-[63/88] flex flex-col ${isSpinning ? 'anim-rolling' : 'anim-pop-up'}`}>
                <div className="h-8 md:h-10 w-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-between px-3 md:px-4 z-10 relative">
                  <span className="text-white font-black text-[8px] md:text-[10px] tracking-widest uppercase drop-shadow">Kuis Ngaji</span>
                  <span className="text-white font-black text-[8px] md:text-[10px] uppercase tracking-widest drop-shadow">
                    {isSpinning ? 'Undi...' : rarity ? RARITY_LABEL[rarity] : 'Rahasia'}
                  </span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 gap-3">
                  <Sparkles className={`w-6 h-6 md:w-8 md:h-8 ${isSpinning ? 'text-slate-300' : rarity ? `text-${rarity}` : 'text-slate-300'} animate-bounce-slow`} strokeWidth={2} />
                  <p className={`font-black tracking-tighter break-words w-full px-2 leading-tight ${isSpinning ? 'text-4xl md:text-5xl text-slate-300' : rarity ? `text-5xl md:text-6xl text-${rarity} drop-shadow-sm` : 'text-4xl text-slate-300'}`}>
                    {isSpinning ? '???' : gachaNameDisplay}
                  </p>
                  <span className={`text-[9px] md:text-[11px] font-bold uppercase tracking-widest ${isSpinning ? 'text-slate-300' : 'text-slate-500'}`}>
                    {isSpinning ? 'Mengacak...' : 'Selamat Maju & Jawab!'}
                  </span>
                </div>

                <div className="h-6 bg-white/70 flex items-center justify-center px-3 text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest border-t border-indigo-100 relative z-10">
                  Giliran {gachaNameDisplay}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-6 md:mt-8">
          {!hasSpun ? (
            <button
              onClick={putarGacha}
              className="w-full py-4 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-xl md:text-2xl rounded-xl shadow-[0_10px_20px_rgba(59,130,246,0.35)] hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all flex items-center justify-center gap-2 tracking-wide group"
            >
              PUTAR NAMA!
              <Dices className="w-6 h-6 md:w-7 md:h-7 group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
            </button>
          ) : (
            <button
              onClick={masukKeSoalGiliran}
              disabled={isSpinning}
              className={`w-full py-4 md:py-5 font-black text-xl md:text-2xl rounded-xl transition-all flex items-center justify-center gap-2 tracking-wide ${
                isSpinning
                  ? 'bg-slate-300 text-slate-500 shadow-none translate-y-3'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-[0_10px_20px_rgba(16,185,129,0.35)] hover:-translate-y-1 active:translate-y-0 active:scale-95'
              }`}
            >
              <Swords className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
              {isSpinning ? 'Mengacak...' : 'MAJU & JAWAB!'}
            </button>
          )}
        <button
          onClick={resetGame}
          className="mt-4 w-full text-slate-400 font-bold py-2 text-sm hover:text-slate-600 relative z-10"
        >
          Batalkan & Kembali
        </button>
      </div>
      </div>
    </div>
  );
}