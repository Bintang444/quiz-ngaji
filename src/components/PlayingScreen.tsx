import { useEffect } from 'react';
import { Lightbulb, PartyPopper, Star } from 'lucide-react';
import type { Soal } from '../types';
import GambarSoal from './GambarSoal';
import { pustakaAudio } from '../utils/audio';

interface Props {
  mode: 'giliran' | 'rame-rame' | null;
  soalSekarang: Soal;
  anakTerpilih: string;
  daftarAnak: string[];
  anakBelumMaju: string[];
  soalTerjawab: number;
  skorKolektif: number;
  skorIndividu: Record<string, number>;
  jawabanDipilih: string | null;
  isBenar: boolean | null;
  feedbackAnim: string;
  jawabSoal: (j: string) => void;
  lanjutSoal: () => void;
  resetGame: () => void;
}

export default function PlayingScreen({
  mode,
  soalSekarang,
  anakTerpilih,
  daftarAnak,
  anakBelumMaju,
  soalTerjawab,
  skorKolektif,
  skorIndividu,
  jawabanDipilih,
  isBenar,
  feedbackAnim,
  jawabSoal,
  lanjutSoal,
  resetGame,
}: Props) {
  const namaGiliran = mode === 'giliran' ? anakTerpilih : 'Satu Kelas!';
  const totalProgress = mode === 'giliran' ? daftarAnak.length : 7;
  const currentProgress = mode === 'giliran' ? daftarAnak.length - anakBelumMaju.length : soalTerjawab + 1;

  useEffect(() => {
    if (jawabanDipilih !== null) {
      if (isBenar) pustakaAudio.benar();
      else pustakaAudio.salah();
    }
  }, [jawabanDipilih, isBenar]);

  const buttonState = (pilihan: string) => {
    if (jawabanDipilih === null) return 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-[0_8px_0_rgb(226,232,240)] active:shadow-none active:translate-y-2';
    if (pilihan === soalSekarang.jawabanBenar) return 'bg-emerald-100 border-emerald-400 text-emerald-800 scale-105 z-10 shadow-[0_8px_0_rgb(52,211,153)] ring-4 ring-emerald-300';
    if (pilihan === jawabanDipilih && !isBenar) return 'bg-rose-100 border-rose-300 text-rose-700 opacity-80 shadow-none translate-y-2';
    return 'bg-slate-50 border-slate-200 text-slate-400 opacity-50 shadow-none translate-y-2';
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-2xl mx-auto p-4 relative z-10">
      <div className="flex justify-between items-center bg-white/95 p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-lg mb-6 md:mb-8 sticky top-4 z-20 backdrop-blur-md border-4 border-slate-100">
        <div className="flex-1">
          <p className="text-[10px] md:text-xs text-slate-400 font-black mb-1 tracking-widest uppercase">Pertanyaan {currentProgress} / {totalProgress}</p>
          <div className="h-3 md:h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full ${mode === 'giliran' ? 'bg-orange-500' : 'bg-purple-500'} transition-all duration-700 ease-out`}
              style={{ width: `${(currentProgress / totalProgress) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex-1 text-right ml-3 md:ml-4 border-l-4 pl-3 md:pl-4 border-slate-100">
          <p className="text-[10px] md:text-xs text-slate-400 font-black uppercase tracking-widest mb-1">{mode === 'giliran' ? 'Giliran:' : 'Skor Kelas:'}</p>
          <p className={`text-lg md:text-2xl font-black truncate leading-none ${mode === 'giliran' ? 'text-orange-600' : 'text-purple-600'}`}>{namaGiliran}</p>
          {mode === 'giliran' ? (
            <span className="mt-1 md:mt-2 text-xs md:text-sm bg-yellow-100 text-yellow-700 px-2 md:px-3 py-1 rounded-xl font-black border-2 border-yellow-200">{skorIndividu[namaGiliran] || 0} BINTANG</span>
          ) : (
            <span className="mt-1 md:mt-2 text-xl md:text-2xl font-black text-amber-500 drop-shadow-sm flex items-center gap-1 justify-end">
              {skorKolektif}
              <Star className="w-5 h-5 md:w-7 md:h-7" fill="currentColor" strokeWidth={1.5} />
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start pb-8">
        <div className="relative mt-10 md:mt-12 mb-5 md:mb-6">
          <div className={`absolute -top-14 md:-top-16 left-1/2 -translate-x-1/2 w-24 h-24 md:w-32 md:h-32 ${soalSekarang.bgColor} rounded-full border-[6px] md:border-[8px] border-white shadow-xl flex items-center justify-center z-10`}>
            <GambarSoal emoji={soalSekarang.emoji} />
          </div>
          <div className="bg-white p-6 pt-16 md:p-8 md:pt-20 pb-6 md:pb-10 rounded-[2rem] md:rounded-[3rem] shadow-xl border-b-[8px] md:border-b-[10px] border-blue-200 text-center relative z-0">
            <h2 className="text-xl md:text-4xl font-black text-slate-800 leading-snug drop-shadow-sm">{soalSekarang.pertanyaan}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          {soalSekarang.pilihan.map((pilihan, idx) => (
            <button
              key={idx}
              onClick={() => jawabSoal(pilihan)}
              disabled={jawabanDipilih !== null}
              className={`w-full text-base md:text-2xl font-black py-4 md:py-7 px-4 md:px-5 rounded-[1.5rem] md:rounded-[2rem] border-4 transition-all duration-200 disabled:cursor-not-allowed ${buttonState(pilihan)}`}
            >
              {pilihan}
            </button>
          ))}
        </div>

        {jawabanDipilih !== null && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className={`bg-white/95 backdrop-blur-sm px-6 py-6 md:px-14 md:py-10 rounded-[2rem] md:rounded-[4rem] shadow-2xl border-[8px] md:border-[12px] transform transition-transform ${feedbackAnim} ${isBenar ? 'border-emerald-400 rotate-2' : 'border-amber-400 -rotate-2'}`}>
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-2">
                {isBenar ? (
                  <PartyPopper className="w-10 h-10 md:w-16 md:h-16 text-emerald-500" strokeWidth={1.5} />
                ) : (
                  <Lightbulb className="w-10 h-10 md:w-16 md:h-16 text-amber-500" strokeWidth={1.5} />
                )}
                <p className="text-3xl md:text-7xl font-black text-center drop-shadow-md">
                  {isBenar ? 'BENAR!' : 'BELUM TEPAT!'}
                </p>
              </div>
              {isBenar ? (
                <p className="text-center text-2xl md:text-4xl font-black mt-2 text-amber-500 bg-amber-50 rounded-full py-2 border-4 border-amber-200 flex items-center justify-center gap-2">
                  +1 Bintang! <Star className="w-6 h-6 md:w-9 md:h-9" fill="currentColor" strokeWidth={1.5} />
                </p>
              ) : (
                <div className="mt-2 text-center">
                  <p className="text-sm md:text-lg font-bold text-amber-500">Nggak apa-apa, yuk ingat lagi!</p>
                  <div className="mt-3 bg-rose-50 rounded-2xl md:rounded-3xl border-4 border-rose-200 p-4 md:p-5">
                    <p className="text-xs md:text-sm font-black uppercase tracking-widest text-rose-400 mb-1">Jawaban yang benar adalah</p>
                    <p className="text-2xl md:text-4xl font-black text-emerald-600">{soalSekarang.jawabanBenar}</p>
                  </div>
                  <button
                    onClick={lanjutSoal}
                    className="pointer-events-auto mt-4 md:mt-5 w-full py-3 md:py-4 bg-emerald-500 text-white font-black text-xl md:text-2xl rounded-2xl shadow-[0_8px_0_rgb(4,120,87)] hover:-translate-y-1 active:shadow-none active:translate-y-2 transition-all"
                  >
                    Lanjut Yuk!
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <button onClick={resetGame} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-400 hover:text-slate-600 bg-white/80 backdrop-blur px-4 py-3 rounded-2xl shadow-sm border-2">
        Akhiri Permainan
      </button>
    </div>
  );
}