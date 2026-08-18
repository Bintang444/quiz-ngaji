import { Dices, UserPlus } from 'lucide-react';

interface Props {
  daftarAnak: string[];
  inputNama: string;
  setInputNama: (v: string) => void;
  tambahAnak: (e: React.FormEvent) => void;
  mulaiGiliran: () => void;
  resetGame: () => void;
}

export default function SetupGiliranScreen({ daftarAnak, inputNama, setInputNama, tambahAnak, mulaiGiliran, resetGame }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10">
      <div className="bg-white/95 p-6 md:p-9 rounded-[2rem] shadow-2xl w-full max-w-md border border-white/60 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-orange-200/50 to-transparent opacity-60" />
        <h2 className="text-2xl md:text-3xl font-black mb-5 md:mb-7 text-center relative z-10 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500">Daftar Nama</span>
        </h2>

        <form onSubmit={tambahAnak} className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-6 relative z-10">
          <input
            type="text"
            value={inputNama}
            onChange={(e) => setInputNama(e.target.value)}
            placeholder="Ketik nama adik..."
            className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-base md:text-lg font-bold text-gray-700 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 transition-all shadow-inner"
          />
          <button
            type="submit"
            className="w-full sm:w-auto shrink-0 px-5 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black text-lg md:text-2xl rounded-xl shadow-[0_6px_0_rgb(194,65,12)] active:shadow-[0_0px_0_rgb(194,65,12)] active:translate-y-1 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
            <span className="sm:hidden">Tambah</span>
          </button>
        </form>

        <div className="mb-6 bg-slate-50/70 p-5 rounded-2xl border-2 border-slate-100 min-h-[130px] relative z-10">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Pemain ({daftarAnak.length}):</h3>
          {daftarAnak.length === 0 ? (
            <p className="text-center text-slate-400 font-bold mt-5 opacity-50">Belum ada yang dicatat...</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {daftarAnak.map((nama, idx) => (
                <span key={idx} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1.5 rounded-xl font-black text-base shadow-md border border-blue-300 animate-fade-in">
                  {nama}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={mulaiGiliran}
          disabled={daftarAnak.length === 0}
          className={`w-full py-4 rounded-xl font-black text-xl md:text-2xl transition-all duration-300 flex items-center justify-center gap-2 relative z-10 ${
            daftarAnak.length > 0
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-[0_10px_20px_rgba(16,185,129,0.35)] hover:-translate-y-1 active:translate-y-0 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed border-none'
          }`}
        >
          <Dices className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
          SIAP GACHA!
        </button>

        <button onClick={resetGame} className="mt-5 w-full text-slate-400 font-bold py-2 text-sm hover:text-slate-600 relative z-10">
          Batalkan & Kembali
        </button>
      </div>
    </div>
  );
}