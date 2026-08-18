import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy } from 'lucide-react';

interface Props {
  mode: 'giliran' | 'rame-rame' | null;
  skorIndividu: Record<string, number>;
  skorKolektif: number;
  resetGame: () => void;
}

export default function ResultScreen({ mode, skorIndividu, skorKolektif, resetGame }: Props) {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.3 },
      colors: ['#ffdf00', '#a855f7', '#22d3ee', '#f59e0b', '#34d399'],
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10 text-center">
      <div className="bg-white/90 backdrop-blur-xl p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl w-full max-w-2xl border border-white/60 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 md:h-40 bg-gradient-to-b from-yellow-200/60 to-transparent opacity-60" />

        <div className="mb-3 md:mb-6 relative z-10 flex justify-center">
          <div className="relative">
            <div className="epic-aura aura-ur" />
            <Trophy className="w-16 h-16 md:w-24 md:h-24 text-yellow-400 animate-bounce relative z-10" strokeWidth={1.5} fill="currentColor" />
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-black mb-1 md:mb-4 relative z-10 tracking-tight drop-shadow-sm">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600">Kuis Selesai!</span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-500 mb-6 md:mb-10 font-bold">Kalian semua hebat hari ini!</p>

        {mode === 'giliran' ? (
          <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 relative z-10">
            <h3 className="text-lg md:text-2xl font-black text-slate-700 bg-white py-2 md:py-3 rounded-full mb-5 md:mb-7 border-4 border-purple-100">Bintang Terkumpul</h3>
            <div className="grid grid-cols-2 gap-3 md:gap-5 text-left">
              {Object.entries(skorIndividu).map(([nama, skor], idx) => (
                <div key={idx} className="bg-white p-3 md:p-4 rounded-2xl border border-purple-200 flex justify-between items-center shadow-md">
                  <span className="font-black text-base md:text-xl text-slate-800 truncate mr-2 md:mr-3">{nama}</span>
                  <div className="flex items-center text-amber-600 font-black text-xl md:text-2xl bg-amber-50 px-3 md:px-4 py-1.5 rounded-xl shadow-inner border border-amber-100">{skor}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8 md:mb-10 relative z-10">
            <div className="relative bg-gradient-to-b from-purple-50 to-indigo-100 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-purple-300 py-6 md:py-8 px-4">
              <div className="h-8 bg-gradient-to-r from-purple-400 to-fuchsia-400 flex justify-center px-4 items-center relative z-10 mb-4 rounded-t-md">
                <span className="text-white font-black text-[10px] tracking-widest uppercase drop-shadow">Bintang Kelas Kita</span>
              </div>
              <div className="text-6xl md:text-8xl font-black text-slate-800 flex items-center justify-center gap-4 md:gap-6 drop-shadow-sm relative z-10">
                {skorKolektif}
                <Star className="w-14 h-14 md:w-20 md:h-20 text-amber-400 animate-bounce" strokeWidth={1.5} fill="currentColor" />
              </div>
              <p className="text-xl md:text-2xl text-purple-700 mt-5 md:mt-6 font-black relative z-10">Kelas yang luar biasa!</p>
            </div>
          </div>
        )}

        <button
          onClick={resetGame}
          className="w-full py-4 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-2xl md:text-3xl rounded-xl shadow-[0_10px_20px_rgba(59,130,246,0.35)] hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all relative z-10"
        >
          Main Lagi Yuk!
        </button>
      </div>
    </div>
  );
}