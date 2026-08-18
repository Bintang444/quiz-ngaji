import { Star, Trophy } from 'lucide-react';

interface Props {
  mode: 'giliran' | 'rame-rame' | 'kode' | null;
  kode: string | null;
  skorIndividu: Record<string, number>;
  skorKolektif: number;
  resetGame: () => void;
}

export default function ResultScreen({ mode, kode, skorIndividu, skorKolektif, resetGame }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10 text-center">
      <div className="bg-white p-6 md:p-14 rounded-[2rem] md:rounded-[4rem] shadow-2xl w-full max-w-2xl border-[8px] md:border-[12px] border-yellow-400 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 md:h-40 bg-gradient-to-b from-yellow-200 to-transparent opacity-60" />

        <div className="mb-3 md:mb-6 relative z-10 flex justify-center">
          <Trophy className="w-16 h-16 md:w-28 md:h-28 text-yellow-400 animate-bounce" strokeWidth={1.5} fill="currentColor" />
        </div>
        <h1 className="text-3xl md:text-6xl font-black text-blue-600 mb-1 md:mb-4 relative z-10 drop-shadow-sm tracking-tight">Kuis Selesai!</h1>
        <p className="text-lg md:text-2xl text-slate-500 mb-6 md:mb-10 font-bold">
          {mode === 'kode' ? 'Kamu hebat hari ini!' : 'Kalian semua hebat hari ini!'}
        </p>

        {mode === 'giliran' ? (
          <div className="space-y-3 md:space-y-4 mb-8 md:mb-12 relative z-10">
            <h3 className="text-lg md:text-2xl font-black text-slate-700 bg-slate-100 py-2 md:py-3 rounded-full mb-5 md:mb-8 border-4 border-slate-200">Bintang Terkumpul</h3>
            <div className="grid grid-cols-2 gap-3 md:gap-5 text-left">
              {Object.entries(skorIndividu).map(([nama, skor], idx) => (
                <div key={idx} className="bg-orange-50 p-3 md:p-5 rounded-2xl md:rounded-3xl border-4 border-orange-200 flex justify-between items-center shadow-sm hover:scale-105 transition-transform">
                  <span className="font-black text-base md:text-xl text-slate-800 truncate mr-2 md:mr-3">{nama}</span>
                  <div className="flex items-center text-amber-500 font-black text-2xl md:text-3xl bg-white px-3 md:px-5 py-1.5 md:py-2 rounded-2xl shadow-sm border-2 border-amber-100">{skor}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8 md:mb-14 p-6 md:p-12 bg-purple-50 rounded-[2rem] md:rounded-[3rem] border-[6px] border-purple-200 shadow-inner relative z-10">
            <p className="text-purple-400 font-black uppercase tracking-widest mb-4 md:mb-6 text-lg md:text-2xl">
              {mode === 'kode' ? `Bintang Paket ${kode}` : 'Bintang Kelas Kita'}
            </p>
            <div className="text-6xl md:text-9xl font-black text-purple-600 flex items-center justify-center gap-4 md:gap-6 drop-shadow-xl">
              {skorKolektif}
              <Star className="w-14 h-14 md:w-24 md:h-24 text-amber-400 animate-bounce" strokeWidth={1.5} fill="currentColor" />
            </div>
            <p className="text-xl md:text-2xl text-purple-600 mt-5 md:mt-8 font-black bg-white inline-block px-6 md:px-8 py-3 md:py-4 rounded-3xl shadow-md border-4 border-purple-100">
              {mode === 'kode' ? 'Bintang kamu, luar biasa!' : 'Kelas yang luar biasa!'}
            </p>
          </div>
        )}

        <button
          onClick={resetGame}
          className="w-full py-4 md:py-6 bg-blue-500 text-white font-black text-2xl md:text-3xl rounded-2xl md:rounded-3xl hover:bg-blue-600 shadow-[0_10px_0_rgb(29,78,216)] active:shadow-[0_0px_0_rgb(29,78,216)] active:translate-y-3 transition-all relative z-10"
        >
          {mode === 'kode' ? 'Main Lagi Yuk!' : 'Main Lagi Yuk!'}
        </button>
      </div>
    </div>
  );
}