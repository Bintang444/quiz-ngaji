import React, { useState, useEffect } from 'react';

// ================= BANK SOAL (DIPERLUAS & DITAMBAH VISUAL) =================
const BANK_SOAL = [
  { id: 1, emoji: "👨‍🦳", pertanyaan: "Siapa manusia pertama yang diciptakan oleh Allah?", pilihan: ["Nabi Nuh", "Nabi Adam", "Nabi Ibrahim", "Nabi Musa"], jawabanBenar: "Nabi Adam", bgColor: "bg-emerald-100" },
  { id: 2, emoji: "👩", pertanyaan: "Siapa nama istri Nabi Adam?", pilihan: ["Hawa", "Sarah", "Hajar", "Aisyah"], jawabanBenar: "Hawa", bgColor: "bg-pink-100" },
  { id: 3, emoji: "🚢", pertanyaan: "Nabi yang diperintah Allah membuat kapal yang sangat besar adalah...", pilihan: ["Nabi Nuh", "Nabi Yusuf", "Nabi Ismail", "Nabi Daud"], jawabanBenar: "Nabi Nuh", bgColor: "bg-cyan-100" },
  { id: 4, emoji: "🕊️", pertanyaan: "Burung apa yang dilepaskan Nabi Nuh untuk mencari daratan setelah banjir?", pilihan: ["Elang", "Merpati", "Gagak", "Rajawali"], jawabanBenar: "Merpati", bgColor: "bg-slate-100" },
  { id: 5, emoji: "🔥", pertanyaan: "Nabi Ibrahim diselamatkan oleh Allah saat dihukum oleh Raja Namrud dengan cara...", pilihan: ["Dilempar ke laut", "Dilempar dari gunung", "Dibakar di dalam api", "Dimasukkan ke sumur"], jawabanBenar: "Dibakar di dalam api", bgColor: "bg-orange-100" },
  { id: 6, emoji: "👑", pertanyaan: "Raja yang sangat sombong dan jahat di zaman Nabi Ibrahim bernama...", pilihan: ["Raja Firaun", "Raja Namrud", "Raja Jalut", "Raja Abrahah"], jawabanBenar: "Raja Namrud", bgColor: "bg-purple-100" },
  { id: 7, emoji: "👦", pertanyaan: "Siapa nama anak Nabi Ibrahim yang sangat taat kepada Allah dan ayahnya?", pilihan: ["Nabi Yusuf", "Nabi Ya'qub", "Nabi Ismail", "Nabi Isa"], jawabanBenar: "Nabi Ismail", bgColor: "bg-blue-100" },
  { id: 8, emoji: "💧", pertanyaan: "Mata air yang memancar saat Nabi Ismail kecil kehausan disebut air...", pilihan: ["Air Terjun", "Air Zam-zam", "Air Sungai", "Air Hujan"], jawabanBenar: "Air Zam-zam", bgColor: "bg-sky-100" },
  { id: 9, emoji: "👳‍♂️", pertanyaan: "Siapa nama ayah dari Nabi Yusuf?", pilihan: ["Nabi Ibrahim", "Nabi Ismail", "Nabi Ya'qub", "Nabi Adam"], jawabanBenar: "Nabi Ya'qub", bgColor: "bg-amber-100" },
  { id: 10, emoji: "🌟", pertanyaan: "Waktu kecil, Nabi Yusuf bermimpi melihat apa?", pilihan: ["11 bintang, matahari & bulan", "Pohon apel yang besar", "Sungai yang terbelah", "Istana yang megah"], jawabanBenar: "11 bintang, matahari & bulan", bgColor: "bg-yellow-100" },
  { id: 11, emoji: "😠", pertanyaan: "Kenapa kakak-kakak Nabi Yusuf membenci dirinya?", pilihan: ["Karena Yusuf nakal", "Karena Iri hati", "Karena Yusuf malas", "Karena Yusuf pelit"], jawabanBenar: "Karena Iri hati", bgColor: "bg-red-100" },
  { id: 12, emoji: "🕳️", pertanyaan: "Karena iri hati, Nabi Yusuf dibuang ke mana oleh kakak-kakaknya?", pilihan: ["Ke sungai", "Ke sumur", "Ke hutan", "Ke laut"], jawabanBenar: "Ke sumur", bgColor: "bg-stone-200" },
  { id: 13, emoji: "🐺", pertanyaan: "Kakak-kakaknya berbohong kepada ayahnya. Mereka bilang Yusuf mati dimakan...", pilihan: ["Singa", "Harimau", "Serigala", "Beruang"], jawabanBenar: "Serigala", bgColor: "bg-neutral-200" },
  { id: 14, emoji: "🐪", pertanyaan: "Setelah ditemukan musafir, Yusuf dibawa dan dijual ke negeri mana?", pilihan: ["Makkah", "Mesir", "Palestina", "Madinah"], jawabanBenar: "Mesir", bgColor: "bg-orange-200" },
  { id: 15, emoji: "💭", pertanyaan: "Selain baik hati, Nabi Yusuf diberi kepintaran oleh Allah untuk menafsirkan...", pilihan: ["Mimpi", "Cuaca", "Bintang", "Peta"], jawabanBenar: "Mimpi", bgColor: "bg-indigo-100" },
  { id: 16, emoji: "🐄", pertanyaan: "Raja Mesir kebingungan karena bermimpi melihat apa?", pilihan: ["Banjir yang sangat besar", "7 sapi gemuk dan 7 sapi kurus", "Bintang jatuh dari langit", "Gunung meletus"], jawabanBenar: "7 sapi gemuk dan 7 sapi kurus", bgColor: "bg-green-100" },
  { id: 17, emoji: "🌾", pertanyaan: "Selain sapi, Raja Mesir juga bermimpi melihat 7 tangkai...", pilihan: ["Padi", "Gandum", "Jagung", "Kurma"], jawabanBenar: "Gandum", bgColor: "bg-yellow-200" },
  { id: 18, emoji: "❤️", pertanyaan: "Apa yang dilakukan Nabi Yusuf waktu bertemu lagi dengan kakak-kakaknya di Mesir?", pilihan: ["Menghukum mereka", "Memarahi mereka", "Mengusir mereka", "Memaafkan mereka"], jawabanBenar: "Memaafkan mereka", bgColor: "bg-rose-100" },
  { id: 19, emoji: "😇", pertanyaan: "Sifat baik apa yang harus kita contoh dari Nabi Yusuf?", pilihan: ["Pemarah", "Sabar dan pemaaf", "Suka berbohong", "Iri hati"], jawabanBenar: "Sabar dan pemaaf", bgColor: "bg-teal-100" },
  { id: 20, emoji: "🏰", pertanyaan: "Di akhir cerita, keluarga Nabi Yusuf akhirnya berkumpul dan hidup bahagia di...", pilihan: ["Makkah", "Mesir", "Hutan", "Dalam Kapal"], jawabanBenar: "Mesir", bgColor: "bg-fuchsia-100" }
];

export default function KuisSekolahMinggu() {
  const [mode, setMode] = useState(null); 
  const [gameState, setGameState] = useState('home'); 
  
  // State Mode Giliran
  const [daftarAnak, setDaftarAnak] = useState([]);
  const [inputNama, setInputNama] = useState('');
  const [anakBelumMaju, setAnakBelumMaju] = useState([]);
  const [anakTerpilih, setAnakTerpilih] = useState('');
  const [skorIndividu, setSkorIndividu] = useState({});
  const [gachaNameDisplay, setGachaNameDisplay] = useState('???');
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  
  // State Umum
  const [soalTersedia, setSoalTersedia] = useState([]);
  const [soalSekarang, setSoalSekarang] = useState(null);
  const [soalTerjawab, setSoalTerjawab] = useState(0); 
  const [skorKolektif, setSkorKolektif] = useState(0);
  const [jawabanDipilih, setJawabanDipilih] = useState(null);
  const [isBenar, setIsBenar] = useState(null);
  const [feedbackAnim, setFeedbackAnim] = useState('');

  // Fungsi Pengacak Soal
  const ambilSoalAcak = (sisaSoal) => {
    let pool = sisaSoal;
    if (pool.length === 0) {
      pool = BANK_SOAL.map(s => s.id); // Reset kalau habis
    }
    const randomIndex = Math.floor(Math.random() * pool.length);
    const idTerpilih = pool[randomIndex];
    const sisaBaru = pool.filter(id => id !== idTerpilih);
    return { soal: BANK_SOAL.find(s => s.id === idTerpilih), sisaBaru };
  };

  const handlePilihMode = (selectedMode) => {
    setMode(selectedMode);
    const semuaIdSoal = BANK_SOAL.map(s => s.id);
    setSoalTersedia(semuaIdSoal);

    if (selectedMode === 'giliran') {
      setGameState('setup');
      setDaftarAnak([]);
      setSkorIndividu({});
    } else {
      const { soal, sisaBaru } = ambilSoalAcak(semuaIdSoal);
      setSoalSekarang(soal);
      setSoalTersedia(sisaBaru);
      setGameState('playing');
      setSkorKolektif(0);
      setSoalTerjawab(0);
    }
  };

  const tambahAnak = (e) => {
    e.preventDefault();
    if (inputNama.trim() !== '') {
      setDaftarAnak([...daftarAnak, inputNama.trim()]);
      setSkorIndividu({ ...skorIndividu, [inputNama.trim()]: 0 });
      setInputNama('');
    }
  };

  const mulaiGiliran = () => {
    if (daftarAnak.length > 0) {
      setAnakBelumMaju([...daftarAnak]);
      setSoalTerjawab(0);
      setGameState('gacha');
      setGachaNameDisplay('???');
      setHasSpun(false);
    }
  };

  const putarGacha = () => {
    setIsSpinning(true);
    setHasSpun(true);
    let counter = 0;
    
    const spinInterval = setInterval(() => {
      const randomDummy = daftarAnak[Math.floor(Math.random() * daftarAnak.length)];
      setGachaNameDisplay(randomDummy);
      counter++;
      
      if (counter > 25) { 
        clearInterval(spinInterval);
        const randomIndex = Math.floor(Math.random() * anakBelumMaju.length);
        const winner = anakBelumMaju[randomIndex];
        setAnakTerpilih(winner);
        setGachaNameDisplay(winner);
        setIsSpinning(false);
        setAnakBelumMaju(prev => prev.filter(n => n !== winner));
      }
    }, 80);
  };

  const masukKeSoalGiliran = () => {
    const { soal, sisaBaru } = ambilSoalAcak(soalTersedia);
    setSoalSekarang(soal);
    setSoalTersedia(sisaBaru);
    setGameState('playing');
  };

  const jawabSoal = (jawaban) => {
    if (jawabanDipilih !== null) return;
    const benar = jawaban === soalSekarang.jawabanBenar;
    setJawabanDipilih(jawaban);
    setIsBenar(benar);
    setFeedbackAnim(benar ? 'animate-bounce text-emerald-500 scale-110' : 'animate-shake text-rose-500');

    if (benar) {
      if (mode === 'giliran') {
        setSkorIndividu(prev => ({ ...prev, [anakTerpilih]: prev[anakTerpilih] + 1 }));
      } else {
        setSkorKolektif(prev => prev + 1);
      }
    }

    setTimeout(() => {
      lanjutkanGame();
    }, 2000);
  };

  const lanjutkanGame = () => {
    setJawabanDipilih(null);
    setIsBenar(null);
    setFeedbackAnim('');

    if (mode === 'giliran') {
      if (anakBelumMaju.length > 0) {
        setGameState('gacha');
        setGachaNameDisplay('???');
        setHasSpun(false);
      } else {
        setGameState('result');
      }
    } else {
      // Mode Rame-rame: 7 Soal biar puas
      if (soalTerjawab + 1 < 7) {
        setSoalTerjawab(prev => prev + 1);
        const { soal, sisaBaru } = ambilSoalAcak(soalTersedia);
        setSoalSekarang(soal);
        setSoalTersedia(sisaBaru);
      } else {
        setGameState('result');
      }
    }
  };

  const resetGame = () => {
    setGameState('home');
    setMode(null);
    setDaftarAnak([]);
    setSkorIndividu({});
    setAnakBelumMaju([]);
    setJawabanDipilih(null);
  };

  // ================= KOMPONEN UI =================

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 relative">
      <div className="bg-white/95 backdrop-blur-sm p-10 rounded-[3rem] shadow-2xl max-w-lg w-full border-[10px] border-blue-400">
        <div className="text-7xl mb-4 animate-bounce">🎪</div>
        <h1 className="text-4xl md:text-5xl font-black text-blue-600 mb-2 drop-shadow-sm tracking-tight">Kuis Seru!</h1>
        <p className="text-xl text-gray-500 mb-10 font-bold">Berapa banyak anak hari ini?</p>
        
        <div className="space-y-6">
          <button 
            onClick={() => handlePilihMode('giliran')}
            className="w-full group relative inline-flex items-center justify-center p-6 font-bold text-white transition-all duration-200 bg-orange-500 rounded-3xl hover:-translate-y-2 focus:outline-none shadow-[0_10px_0_rgb(194,65,12)] active:shadow-[0_0px_0_rgb(194,65,12)] active:translate-y-2"
          >
            <div className="text-left flex items-center justify-between w-full">
              <div>
                <span className="block text-2xl drop-shadow-md">🙋‍♂️ Sedikit (≤10)</span>
                <span className="block text-sm font-medium text-orange-100 mt-1">Undi Nama & Pegang HP Sendiri</span>
              </div>
              <span className="text-4xl drop-shadow-md group-hover:rotate-12 transition-transform">🎲</span>
            </div>
          </button>

          <button 
            onClick={() => handlePilihMode('rame-rame')}
            className="w-full group relative inline-flex items-center justify-center p-6 font-bold text-white transition-all duration-200 bg-purple-500 rounded-3xl hover:-translate-y-2 focus:outline-none shadow-[0_10px_0_rgb(126,34,206)] active:shadow-[0_0px_0_rgb(126,34,206)] active:translate-y-2"
          >
            <div className="text-left flex items-center justify-between w-full">
              <div>
                <span className="block text-2xl drop-shadow-md">🙌 Rame Banget</span>
                <span className="block text-sm font-medium text-purple-100 mt-1">Guru Pegang HP, Jawab Bareng!</span>
              </div>
              <span className="text-4xl drop-shadow-md group-hover:scale-110 transition-transform">🎤</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSetupGiliran = () => (
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

  const renderGacha = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10">
      <div className="bg-white/95 p-12 rounded-[4rem] shadow-2xl w-full max-w-lg text-center border-[12px] border-blue-400 relative overflow-hidden">
        
        {/* Dekorasi Cahaya Belakang */}
        <div className={`absolute inset-0 bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-yellow-200 via-transparent to-yellow-200 opacity-50 ${isSpinning ? 'animate-spin-slow' : ''}`}></div>

        <h2 className="text-4xl font-black text-blue-600 mb-10 relative z-10 tracking-tight drop-shadow-sm">GILIRAN SIAPA YA?! 👀</h2>
        
        <div className={`
          my-10 py-12 rounded-[3rem] border-[6px] transition-all duration-300 relative z-10
          ${isSpinning ? 'bg-slate-100 border-slate-300 scale-95' : 'bg-gradient-to-b from-yellow-100 to-amber-200 border-yellow-400 scale-100 shadow-2xl'}
        `}>
          <p className={`
            font-black tracking-tighter break-words px-4 leading-none
            ${isSpinning ? 'text-6xl text-slate-300' : 'text-6xl md:text-7xl text-amber-600 drop-shadow-md animate-bounce'}
          `}>
            {gachaNameDisplay}
          </p>
        </div>

        <div className="relative z-10 mt-10">
          {!hasSpun ? (
            <button 
              onClick={putarGacha}
              className="w-full py-6 bg-rose-500 text-white font-black text-3xl rounded-3xl hover:bg-rose-600 shadow-[0_12px_0_rgb(159,18,57)] active:shadow-[0_0px_0_rgb(159,18,57)] active:translate-y-3 transition-all tracking-wide"
            >
              PUTAR NAMA! 🎰
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
              {isSpinning ? 'Mengacak...' : 'MAJU & JAWAB! 🚀'}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderPlaying = () => {
    if (!soalSekarang) return null;
    
    const namaGiliran = mode === 'giliran' ? anakTerpilih : 'Satu Kelas!';
    const totalProgress = mode === 'giliran' ? daftarAnak.length : 7;
    const currentProgress = mode === 'giliran' ? (daftarAnak.length - anakBelumMaju.length) : (soalTerjawab + 1);

    return (
      <div className="flex flex-col min-h-screen w-full max-w-2xl mx-auto p-4 relative z-10">
        
        {/* Top Bar: Progress & Skor */}
        <div className="flex justify-between items-center bg-white/95 p-5 rounded-3xl shadow-lg mb-8 sticky top-4 z-20 backdrop-blur-md border-4 border-slate-100">
          <div className="flex-1">
            <p className="text-xs text-slate-400 font-black mb-2 tracking-widest uppercase">
              Pertanyaan {currentProgress} / {totalProgress}
            </p>
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full ${mode === 'giliran' ? 'bg-orange-500' : 'bg-purple-500'} transition-all duration-700 ease-out`} 
                style={{ width: `${(currentProgress / totalProgress) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex-1 text-right ml-4 border-l-4 pl-4 border-slate-100">
             <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">
                {mode === 'giliran' ? 'Giliran:' : 'Skor Kelas:'}
             </p>
             <div className="flex flex-col items-end">
                <p className={`text-2xl font-black truncate leading-none ${mode === 'giliran' ? 'text-orange-600' : 'text-purple-600'}`}>
                  {namaGiliran}
                </p>
                {mode === 'giliran' ? (
                   <span className="mt-2 text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-xl font-black border-2 border-yellow-200">
                     {skorIndividu[namaGiliran] || 0} BINTANG ⭐
                   </span>
                ) : (
                   <span className="mt-2 text-2xl font-black text-amber-500 drop-shadow-sm flex items-center gap-1">
                     {skorKolektif} ⭐
                   </span>
                )}
             </div>
          </div>
        </div>

        {/* Kartu Pertanyaan Bergambar */}
        <div className="flex-1 flex flex-col justify-start pb-8">
          
          <div className="relative mt-12 mb-6">
            {/* Area Gambar / Visual (Menggunakan warna dinamis & Emoji raksasa sebagai ilustrasi) */}
            <div className={`absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 ${soalSekarang.bgColor} rounded-full border-[8px] border-white shadow-xl flex items-center justify-center z-10`}>
              <span className="text-6xl drop-shadow-md animate-bounce-slow">{soalSekarang.emoji}</span>
            </div>

            <div className="bg-white p-8 pt-20 pb-10 rounded-[3rem] shadow-xl border-b-[10px] border-blue-200 text-center relative z-0">
               <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-snug drop-shadow-sm">
                 {soalSekarang.pertanyaan}
               </h2>
            </div>
          </div>

          {/* Grid Pilihan Jawaban */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            {soalSekarang.pilihan.map((pilihan, idx) => {
              // Styling Logika Tombol
              let buttonStateClass = "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-[0_8px_0_rgb(226,232,240)] active:shadow-none active:translate-y-2";
              
              if (jawabanDipilih !== null) {
                if (pilihan === soalSekarang.jawabanBenar) {
                  buttonStateClass = "bg-emerald-100 border-emerald-400 text-emerald-800 scale-105 z-10 shadow-[0_8px_0_rgb(52,211,153)] ring-4 ring-emerald-300";
                } else if (pilihan === jawabanDipilih && !isBenar) {
                   buttonStateClass = "bg-rose-100 border-rose-300 text-rose-700 opacity-80 shadow-none translate-y-2";
                } else {
                  buttonStateClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-50 shadow-none translate-y-2";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => jawabSoal(pilihan)}
                  disabled={jawabanDipilih !== null}
                  className={`
                    w-full text-xl md:text-2xl font-black py-7 px-5 rounded-[2rem] border-4 transition-all duration-200
                    disabled:cursor-not-allowed
                    ${buttonStateClass}
                  `}
                >
                  {pilihan}
                </button>
              )
            })}
          </div>

          {/* Overlay Feedback Animasi Heboh */}
          {jawabanDipilih !== null && (
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
              <div className={`bg-white/95 backdrop-blur-sm px-14 py-10 rounded-[4rem] shadow-2xl border-[12px] transform transition-transform ${feedbackAnim} ${isBenar ? 'border-emerald-400 rotate-2' : 'border-rose-400 -rotate-2'}`}>
                <p className="text-6xl md:text-7xl font-black mb-4 text-center drop-shadow-md">
                  {isBenar ? 'BENAR! 🎉' : 'SALAH... 😢'}
                </p>
                {isBenar && <p className="text-center text-4xl font-black mt-2 text-amber-500 bg-amber-50 rounded-full py-2 border-4 border-amber-200">+1 Bintang! ⭐</p>}
              </div>
            </div>
          )}
        </div>
        
        <button onClick={resetGame} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-400 hover:text-slate-600 bg-white/80 backdrop-blur px-4 py-3 rounded-2xl shadow-sm border-2">
           Akhiri Permainan
        </button>
      </div>
    );
  };

  const renderResult = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10 text-center">
      <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl w-full max-w-2xl border-[12px] border-yellow-400 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-yellow-200 to-transparent opacity-60"></div>
        
        <div className="text-8xl mb-6 relative z-10 animate-bounce">🏆</div>
        <h1 className="text-5xl md:text-6xl font-black text-blue-600 mb-4 relative z-10 drop-shadow-sm tracking-tight">Kuis Selesai!</h1>
        <p className="text-2xl text-slate-500 mb-10 font-bold">Kalian semua hebat hari ini!</p>

        {mode === 'giliran' ? (
          <div className="space-y-4 mb-12 relative z-10">
            <h3 className="text-2xl font-black text-slate-700 bg-slate-100 py-3 rounded-full mb-8 border-4 border-slate-200">⭐ Bintang Terkumpul ⭐</h3>
            <div className="grid grid-cols-2 gap-5 text-left">
              {Object.entries(skorIndividu).map(([nama, skor], idx) => (
                <div key={idx} className="bg-orange-50 p-5 rounded-3xl border-4 border-orange-200 flex justify-between items-center shadow-sm hover:scale-105 transition-transform">
                  <span className="font-black text-xl text-slate-800 truncate mr-3">{nama}</span>
                  <div className="flex items-center text-amber-500 font-black text-3xl bg-white px-5 py-2 rounded-2xl shadow-sm border-2 border-amber-100">
                    {skor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-14 p-12 bg-purple-50 rounded-[3rem] border-[6px] border-purple-200 shadow-inner relative z-10">
             <p className="text-purple-400 font-black uppercase tracking-widest mb-6 text-2xl">Bintang Kelas Kita</p>
             <div className="text-9xl font-black text-purple-600 flex items-center justify-center gap-6 drop-shadow-xl">
                {skorKolektif} <span className="animate-bounce">⭐</span>
             </div>
             <p className="text-2xl text-purple-600 mt-8 font-black bg-white inline-block px-8 py-4 rounded-3xl shadow-md border-4 border-purple-100">Kelas yang luar biasa! 🎉</p>
          </div>
        )}

        <button 
          onClick={resetGame}
          className="w-full py-6 bg-blue-500 text-white font-black text-3xl rounded-3xl hover:bg-blue-600 shadow-[0_12px_0_rgb(29,78,216)] active:shadow-[0_0px_0_rgb(29,78,216)] active:translate-y-3 transition-all relative z-10"
        >
          Main Lagi Yuk! 🎈
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden relative selection:bg-blue-200">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounceSlow { 0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); } }
        
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        .animate-spin-slow { animation: spinSlow 8s linear infinite; }
        .animate-bounce-slow { animation: bounceSlow 2s infinite; }
        
        body { margin: 0; background-color: #f8fafc; }
      `}</style>
      
      {/* Latar Belakang Ceria */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-300/20 rounded-full mix-blend-multiply blur-[80px] animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-sky-300/20 rounded-full mix-blend-multiply blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-pink-300/20 rounded-full mix-blend-multiply blur-[80px] animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Kontainer Utama */}
      <div className="relative z-10 w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        {gameState === 'home' && renderHome()}
        {gameState === 'setup' && renderSetupGiliran()}
        {gameState === 'gacha' && renderGacha()}
        {gameState === 'playing' && renderPlaying()}
        {gameState === 'result' && renderResult()}
      </div>
    </div>
  );
}