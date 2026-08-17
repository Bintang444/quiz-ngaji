import { Dices } from 'lucide-react';

interface Props {
  gachaNameDisplay: string;
  isSpinning: boolean;
  hasSpun: boolean;
  putarGacha: () => void;
  masukKeSoalGiliran: () => void;
}

export default function GachaScreen({ gachaNameDisplay, isSpinning, hasSpun, putarGacha, masukKeSoalGiliran }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10">
      <div className="bg-white/95 p-12 rounded-[4rem] shadow-2xl w-full max-w-lg text-center border-[12px] border-blue-400 relative overflow-hidden">
        <div className={`absolute inset-0 bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-yellow-200 via-transparent to-yellow-200 opacity-50 ${isSpinning ? 'animate-spin-slow' : ''}`} />

        <h2 className="text-4xl font-black text-blue-600 mb-10 relative z-10 tracking-tight drop-shadow-sm">GILIRAN SIAPA YA?</h2>

        <div className={`my-10 py-12 rounded-[3rem] border-[6px] transition-all duration-300 relative z-10 ${isSpinning ? 'bg-slate-100 border-slate-300 scale-95' : 'bg-gradient-to-b from-yellow-100 to-amber-200 border-yellow-400 scale-100 shadow-2xl'}`}>
          <p className={`font-black tracking-tighter break-words px-4 leading-none ${isSpinning ? 'text-6xl text-slate-300' : 'text-6xl md:text-7xl text-amber-600 drop-shadow-md animate-bounce'}`}>
            {gachaNameDisplay}
          </p>
        </div>

        <div className="relative z-10 mt-10">
          {!hasSpun ? (
            <button
              onClick={putarGacha}
              className="w-full py-6 bg-rose-500 text-white font-black text-3xl rounded-3xl hover:bg-rose-600 shadow-[0_12px_0_rgb(159,18,57)] active:shadow-[0_0px_0_rgb(159,18,57)] active:translate-y-3 transition-all tracking-wide flex items-center justify-center gap-3"
            >
              PUTAR NAMA!
              <Dices className="w-9 h-9 group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
            </button>
          ) : (
            <button
              onClick={masukKeSoalGiliran}
              disabled={isSpinning}
              className={`w-full py-6 font-black text-3xl rounded-3xl transition-all tracking-wide ${
                isSpinning
                  ? 'bg-slate-300 text-slate-500 shadow-none translate-y-3'
                  : 'bg-emerald-500 text-white shadow-[0_12px_0_rgb(4,120,87)] hover:-translate-y-1 active:shadow-[0_0px_0_rgb(4,120,87)] active:translate-y-3'
              }`}
            >
              {isSpinning ? 'Mengacak...' : 'MAJU & JAWAB!'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}