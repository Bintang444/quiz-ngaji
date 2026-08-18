import { PartyPopper, UserPlus, Users } from 'lucide-react';
import type { Mode } from '../types';

interface Props {
  onPilihMode: (mode: Mode) => void;
}

export default function HomeScreen({ onPilihMode }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 relative">
      <div className="w-full max-w-lg">
        {/* <span className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm mb-4">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
          </span>
          Kuis Ngaji • Sistem Aktif
        </span> */}

        <div className="bg-white/90 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] shadow-2xl border border-white/60 relative z-10 w-full">
          <div className="mb-4 flex justify-center">
            <PartyPopper className="w-14 h-14 md:w-20 md:h-20 text-blue-500 animate-bounce" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-2 drop-shadow-sm">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600">
              Kuis Seru!
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 mb-8 font-bold">Berapa banyak anak hari ini?</p>

          <div className="space-y-4 md:space-y-5">
            <button
              onClick={() => onPilihMode('giliran')}
              className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-black text-base md:text-lg py-4 md:py-5 px-4 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-[0_10px_20px_rgba(249,115,22,0.35)] hover:-translate-y-1 active:translate-y-0 active:scale-95 group"
            >
              <UserPlus className="w-7 h-7 md:w-8 md:h-8 text-orange-100 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <span className="flex-1 text-left">
                <span className="block font-black drop-shadow-md">SEDIKIT (≤10)</span>
                <span className="block text-xs md:text-sm font-bold text-orange-100">Undi Nama & Pegang HP Sendiri</span>
              </span>
            </button>

            <button
              onClick={() => onPilihMode('rame-rame')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-base md:text-lg py-4 md:py-5 px-4 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-[0_10px_20px_rgba(59,130,246,0.35)] hover:-translate-y-1 active:translate-y-0 active:scale-95 group"
            >
              <Users className="w-7 h-7 md:w-8 md:h-8 text-blue-100 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <span className="flex-1 text-left">
                <span className="block font-black drop-shadow-md">RAME BANGET</span>
                <span className="block text-xs md:text-sm font-bold text-blue-100">Guru Pegang HP, Jawab Bareng!</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}