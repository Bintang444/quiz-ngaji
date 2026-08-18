import { lazy, Suspense, useState } from 'react';
import { PartyPopper, QrCode, ScanLine, UserPlus, Users } from 'lucide-react';
import type { Mode } from '../types';
import { PAKET_SOAL } from '../data/soal';

const QrScanner = lazy(() => import('./QrScanner'));

interface Props {
  onPilihMode: (mode: Mode) => void;
  onPilihKode: (kode: string) => boolean;
}

export default function HomeScreen({ onPilihMode, onPilihKode }: Props) {
  const [kodeInput, setKodeInput] = useState('');
  const [kodeError, setKodeError] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const submitKode = (e: React.FormEvent) => {
    e.preventDefault();
    const kode = kodeInput.trim().toUpperCase();
    if (PAKET_SOAL[kode]) {
      setKodeError(false);
      onPilihKode(kode);
    } else {
      setKodeError(true);
    }
  };

  const terimaScan = (kode: string): boolean => {
    if (PAKET_SOAL[kode]) {
      setShowScanner(false);
      onPilihKode(kode);
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 relative">
      <div className="bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl max-w-lg w-full border-[8px] md:border-[10px] border-blue-400">
        <div className="mb-3 flex justify-center">
          <PartyPopper className="w-14 h-14 md:w-20 md:h-20 text-blue-500 animate-bounce" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-blue-600 mb-1 drop-shadow-sm tracking-tight">Kuis Seru!</h1>
        <p className="text-base md:text-xl text-gray-500 mb-6 md:mb-10 font-bold">Berapa banyak anak hari ini?</p>

        <div className="space-y-4 md:space-y-6">
          <button
            onClick={() => onPilihMode('giliran')}
            className="w-full group relative inline-flex items-center justify-center p-4 md:p-6 font-bold text-white transition-all duration-200 bg-orange-500 rounded-2xl md:rounded-3xl hover:-translate-y-2 focus:outline-none shadow-[0_8px_0_rgb(194,65,12)] active:shadow-[0_0px_0_rgb(194,65,12)] active:translate-y-2"
          >
            <div className="text-left flex items-center gap-3 md:gap-4 w-full">
              <UserPlus className="w-8 h-8 md:w-10 md:h-10 text-orange-100 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <div>
                <span className="block text-lg md:text-2xl font-black drop-shadow-md">Sedikit (≤10)</span>
                <span className="block text-xs md:text-sm font-medium text-orange-100 mt-1">Undi Nama & Pegang HP Sendiri</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => onPilihMode('rame-rame')}
            className="w-full group relative inline-flex items-center justify-center p-4 md:p-6 font-bold text-white transition-all duration-200 bg-purple-500 rounded-2xl md:rounded-3xl hover:-translate-y-2 focus:outline-none shadow-[0_8px_0_rgb(126,34,206)] active:shadow-[0_0px_0_rgb(126,34,206)] active:translate-y-2"
          >
            <div className="text-left flex items-center gap-3 md:gap-4 w-full">
              <Users className="w-8 h-8 md:w-10 md:h-10 text-purple-100 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <div>
                <span className="block text-lg md:text-2xl font-black drop-shadow-md">Rame Banget</span>
                <span className="block text-xs md:text-sm font-medium text-purple-100 mt-1">Guru Pegang HP, Jawab Bareng!</span>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-6 md:mt-10 pt-5 md:pt-7 border-t-4 border-dashed border-blue-200">
          <div className="flex items-center justify-center gap-2 mb-3">
            <QrCode className="w-5 h-5 text-blue-500" />
            <p className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-widest">Main Pakai Kode QR</p>
          </div>

          <button
            onClick={() => setShowScanner(true)}
            className="w-full inline-flex items-center justify-center gap-3 p-4 md:p-5 bg-emerald-500 text-white font-black text-lg md:text-xl rounded-2xl md:rounded-3xl hover:bg-emerald-600 shadow-[0_8px_0_rgb(4,120,87)] active:shadow-[0_0px_0_rgb(4,120,87)] active:translate-y-2 transition-all mb-3 md:mb-4"
          >
            <ScanLine className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2.5} />
            Scan QR
          </button>

          <form onSubmit={submitKode} className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <input
              type="text"
              value={kodeInput}
              onChange={(e) => {
                setKodeInput(e.target.value);
                setKodeError(false);
              }}
              placeholder="Atau ketik kode (mis. SET-A)"
              className={`flex-1 px-4 py-3 md:py-4 text-center font-black text-lg md:text-xl tracking-widest uppercase bg-white rounded-2xl border-4 outline-none focus:border-blue-400 transition-colors placeholder:font-medium placeholder:tracking-normal placeholder:text-gray-300 placeholder:normal-case ${
                kodeError ? 'border-rose-300 bg-rose-50' : 'border-slate-200'
              }`}
            />
            <button
              type="submit"
              className="px-5 md:px-6 py-3 md:py-4 bg-blue-500 text-white font-black text-lg md:text-xl rounded-2xl hover:bg-blue-600 shadow-[0_5px_0_rgb(29,78,216)] active:shadow-[0_0px_0_rgb(29,78,216)] active:translate-y-1 transition-all"
            >
              Mulai
            </button>
          </form>
          {kodeError && <p className="mt-2 text-sm font-bold text-rose-500">Kode gak ketemu. Cek lagi ya!</p>}
        </div>
      </div>

      {showScanner && (
        <Suspense fallback={null}>
          <QrScanner onKode={terimaScan} onBatal={() => setShowScanner(false)} />
        </Suspense>
      )}
    </div>
  );
}