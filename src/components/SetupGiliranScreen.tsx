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
      <div className="bg-white p-8 rounded-[3rem] shadow-2xl w-full max-w-md border-[8px] border-orange-400">
        <h2 className="text-3xl font-black text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <span>📝</span> Daftar Nama
        </h2>

        <form onSubmit={tambahAnak} className="flex gap-3 mb-8">
          <input
            type="text"
            value={inputNama}
            onChange={(e) => setInputNama(e.target.value)}
            placeholder="Ketik nama adik..."
            className="flex-1 px-5 py-4 rounded-2xl border-4 border-orange-100 focus:border-orange-400 focus:outline-none text-xl font-bold text-gray-700 bg-orange-50/50"
          />
          <button
            type="submit"
            className="px-6 py-4 bg-orange-500 text-white font-black text-xl rounded-2xl shadow-[0_6px_0_rgb(194,65,12)] active:shadow-[0_0px_0_rgb(194,65,12)] active:translate-y-1 transition-all"
          >
            +
          </button>
        </form>

        <div className="mb-8 bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 min-h-[150px]">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Pemain ({daftarAnak.length}):</h3>
          {daftarAnak.length === 0 ? (
            <p className="text-center text-slate-400 font-bold mt-6 opacity-50">Belum ada yang dicatat...</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {daftarAnak.map((nama, idx) => (
                <span key={idx} className="bg-white text-orange-600 px-4 py-2 rounded-xl font-black text-lg shadow-sm border-2 border-orange-100 animate-fade-in">
                  {nama}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={mulaiGiliran}
          disabled={daftarAnak.length === 0}
          className={`w-full py-5 rounded-2xl font-black text-2xl transition-all ${
            daftarAnak.length > 0
              ? 'bg-emerald-500 text-white shadow-[0_8px_0_rgb(4,120,87)] hover:-translate-y-1 active:shadow-none active:translate-y-2'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed border-none'
          }`}
        >
          Siap Gacha! 🎲
        </button>

        <button onClick={resetGame} className="mt-6 w-full text-slate-400 font-bold py-2 hover:text-slate-600">
          Batalkan & Kembali
        </button>
      </div>
    </div>
  );
}