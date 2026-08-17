import { Star, Trophy } from 'lucide-react';

interface Props {
  mode: 'giliran' | 'rame-rame' | null;
  skorIndividu: Record<string, number>;
  skorKolektif: number;
  resetGame: () => void;
}

export default function ResultScreen({ mode, skorIndividu, skorKolektif, resetGame }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10 text-center">
      <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl w-full max-w-2xl border-[12px] border-yellow-400 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-yellow-200 to-transparent opacity-60" />

        <div className="mb-6 relative z-10 flex justify-center">
          <Trophy className="w-28 h-28 text-yellow-400 animate-bounce" strokeWidth={1.5} fill="currentColor" />
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-blue-600 mb-4 relative z-10 drop-shadow-sm tracking-tight">Kuis Selesai!</h1>
        <p className="text-2xl text-slate-500 mb-10 font-bold">Kalian semua hebat hari ini!</p>

        {mode === 'giliran' ? (
          <div className="space-y-4 mb-12 relative z-10">
            <h3 className="text-2xl font-black text-slate-700 bg-slate-100 py-3 rounded-full mb-8 border-4 border-slate-200">Bintang Terkumpul</h3>
            <div className="grid grid-cols-2 gap-5 text-left">
              {Object.entries(skorIndividu).map(([nama, skor], idx) => (
                <div key={idx} className="bg-orange-50 p-5 rounded-3xl border-4 border-orange-200 flex justify-between items-center shadow-sm hover:scale-105 transition-transform">
                  <span className="font-black text-xl text-slate-800 truncate mr-3">{nama}</span>
                  <div className="flex items-center text-amber-500 font-black text-3xl bg-white px-5 py-2 rounded-2xl shadow-sm border-2 border-amber-100">{skor}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-14 p-12 bg-purple-50 rounded-[3rem] border-[6px] border-purple-200 shadow-inner relative z-10">
            <p className="text-purple-400 font-black uppercase tracking-widest mb-6 text-2xl">Bintang Kelas Kita</p>
            <div className="text-9xl font-black text-purple-600 flex items-center justify-center gap-6 drop-shadow-xl">
              {skorKolektif}
              <Star className="w-24 h-24 text-amber-400 animate-bounce" strokeWidth={1.5} fill="currentColor" />
            </div>
            <p className="text-2xl text-purple-600 mt-8 font-black bg-white inline-block px-8 py-4 rounded-3xl shadow-md border-4 border-purple-100">Kelas yang luar biasa!</p>
          </div>
        )}

        <button
          onClick={resetGame}
          className="w-full py-6 bg-blue-500 text-white font-black text-3xl rounded-3xl hover:bg-blue-600 shadow-[0_12px_0_rgb(29,78,216)] active:shadow-[0_0px_0_rgb(29,78,216)] active:translate-y-3 transition-all relative z-10"
        >
          Main Lagi Yuk!
        </button>
      </div>
    </div>
  );
}