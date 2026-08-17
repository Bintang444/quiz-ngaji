import { PartyPopper, UserPlus, Users } from 'lucide-react';
import type { Mode } from '../types';

interface Props {
  onPilihMode: (mode: Mode) => void;
}

export default function HomeScreen({ onPilihMode }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 relative">
      <div className="bg-white/95 backdrop-blur-sm p-10 rounded-[3rem] shadow-2xl max-w-lg w-full border-[10px] border-blue-400">
        <div className="mb-4 flex justify-center">
          <PartyPopper className="w-20 h-20 text-blue-500 animate-bounce" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-blue-600 mb-2 drop-shadow-sm tracking-tight">Kuis Seru!</h1>
        <p className="text-xl text-gray-500 mb-10 font-bold">Berapa banyak anak hari ini?</p>

        <div className="space-y-6">
          <button
            onClick={() => onPilihMode('giliran')}
            className="w-full group relative inline-flex items-center justify-center p-6 font-bold text-white transition-all duration-200 bg-orange-500 rounded-3xl hover:-translate-y-2 focus:outline-none shadow-[0_10px_0_rgb(194,65,12)] active:shadow-[0_0px_0_rgb(194,65,12)] active:translate-y-2"
          >
            <div className="text-left flex items-center gap-4 w-full">
              <UserPlus className="w-10 h-10 text-orange-100 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <div>
                <span className="block text-2xl font-black drop-shadow-md">Sedikit (≤10)</span>
                <span className="block text-sm font-medium text-orange-100 mt-1">Undi Nama & Pegang HP Sendiri</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => onPilihMode('rame-rame')}
            className="w-full group relative inline-flex items-center justify-center p-6 font-bold text-white transition-all duration-200 bg-purple-500 rounded-3xl hover:-translate-y-2 focus:outline-none shadow-[0_10px_0_rgb(126,34,206)] active:shadow-[0_0px_0_rgb(126,34,206)] active:translate-y-2"
          >
            <div className="text-left flex items-center gap-4 w-full">
              <Users className="w-10 h-10 text-purple-100 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <div>
                <span className="block text-2xl font-black drop-shadow-md">Rame Banget</span>
                <span className="block text-sm font-medium text-purple-100 mt-1">Guru Pegang HP, Jawab Bareng!</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}