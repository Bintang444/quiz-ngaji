import { useEffect, useRef, useState } from 'react';
import type { GameState, Mode, Soal } from '../types';
import { BANK_SOAL, PAKET_SOAL, SEMUA_SOAL } from '../data/soal';
import { pustakaAudio } from '../utils/audio';

const JUMLAH_SOAL_RAME = 7;

function inisialisasiPaket(kode: string | undefined) {
  if (!kode) return { sisa: [] as number[], sekarang: null as Soal | null };
  const paket = PAKET_SOAL[kode];
  if (!paket) return { sisa: [] as number[], sekarang: null as Soal | null };
  const ids = paket.map((s) => s.id);
  const id = ids[Math.floor(Math.random() * ids.length)];
  return {
    sisa: ids.filter((x) => x !== id),
    sekarang: paket.find((s) => s.id === id) ?? null,
  };
}

export function useKuis(kodeAwal?: string) {
  const { sisa: sisaAwal, sekarang: soalAwal } = inisialisasiPaket(kodeAwal);
  const [mode, setMode] = useState<Mode | null>(kodeAwal ? 'kode' : null);
  const [gameState, setGameState] = useState<GameState>(kodeAwal ? 'playing' : 'home');
  const [kode, setKode] = useState<string | null>(kodeAwal ?? null);

  const [daftarAnak, setDaftarAnak] = useState<string[]>([]);
  const [inputNama, setInputNama] = useState('');
  const [anakBelumMaju, setAnakBelumMaju] = useState<string[]>([]);
  const [anakTerpilih, setAnakTerpilih] = useState('');
  const [skorIndividu, setSkorIndividu] = useState<Record<string, number>>({});
  const [gachaNameDisplay, setGachaNameDisplay] = useState('???');
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const [soalTersedia, setSoalTersedia] = useState<number[]>(sisaAwal);
  const [soalSekarang, setSoalSekarang] = useState<Soal | null>(soalAwal);
  const [soalTerjawab, setSoalTerjawab] = useState(0);
  const [skorKolektif, setSkorKolektif] = useState(0);
  const [jawabanDipilih, setJawabanDipilih] = useState<string | null>(null);
  const [isBenar, setIsBenar] = useState<boolean | null>(null);
  const [feedbackAnim, setFeedbackAnim] = useState('');
  const [totalSoal, setTotalSoal] = useState(kodeAwal ? PAKET_SOAL[kodeAwal]?.length ?? JUMLAH_SOAL_RAME : JUMLAH_SOAL_RAME);
  const autoTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (autoTimer.current !== null) {
        clearTimeout(autoTimer.current);
        autoTimer.current = null;
      }
    };
  }, []);

  const ambilSoalAcak = (sisaSoal: number[]) => {
    const pool = sisaSoal.length === 0 ? SEMUA_SOAL.map((s) => s.id) : sisaSoal;
    const idTerpilih = pool[Math.floor(Math.random() * pool.length)];
    return {
      soal: SEMUA_SOAL.find((s) => s.id === idTerpilih)!,
      sisaBaru: pool.filter((id) => id !== idTerpilih),
    };
  };

  const pilihKode = (kodeDipilih: string) => {
    const paket = PAKET_SOAL[kodeDipilih];
    if (!paket) return false;
    setMode('kode');
    setKode(kodeDipilih);
    setTotalSoal(paket.length);
    const idPaket = paket.map((s) => s.id);
    setSoalTersedia(idPaket);
    const { soal, sisaBaru } = ambilSoalAcak(idPaket);
    setSoalSekarang(soal);
    setSoalTersedia(sisaBaru);
    setSoalTerjawab(0);
    setSkorKolektif(0);
    setJawabanDipilih(null);
    setIsBenar(null);
    setFeedbackAnim('');
    setGameState('playing');
    return true;
  };

  const handlePilihMode = (selectedMode: Mode) => {
    setMode(selectedMode);
    const semuaIdSoal = BANK_SOAL.map((s) => s.id);
    setSoalTersedia(semuaIdSoal);

    if (selectedMode === 'giliran') {
      setGameState('setup');
      setDaftarAnak([]);
      setSkorIndividu({});
    } else {
      setTotalSoal(JUMLAH_SOAL_RAME);
      const { soal, sisaBaru } = ambilSoalAcak(semuaIdSoal);
      setSoalSekarang(soal);
      setSoalTersedia(sisaBaru);
      setGameState('playing');
      setSkorKolektif(0);
      setSoalTerjawab(0);
    }
  };

  const tambahAnak = (e: React.FormEvent) => {
    e.preventDefault();
    const nama = inputNama.trim();
    if (nama !== '') {
      setDaftarAnak([...daftarAnak, nama]);
      setSkorIndividu((prev) => ({ ...prev, [nama]: 0 }));
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
    pustakaAudio.mulaiPutar();
    setIsSpinning(true);
    setHasSpun(true);
    let counter = 0;

    const spinInterval = setInterval(() => {
      const randomDummy = daftarAnak[Math.floor(Math.random() * daftarAnak.length)];
      setGachaNameDisplay(randomDummy);
      pustakaAudio.tick();
      counter++;

      if (counter > 25) {
        clearInterval(spinInterval);
        const winner = anakBelumMaju[Math.floor(Math.random() * anakBelumMaju.length)];
        setAnakTerpilih(winner);
        setGachaNameDisplay(winner);
        setIsSpinning(false);
        setAnakBelumMaju((prev) => prev.filter((n) => n !== winner));
        pustakaAudio.selesaiPutar();
      }
    }, 80);
  };

  const masukKeSoalGiliran = () => {
    const { soal, sisaBaru } = ambilSoalAcak(soalTersedia);
    setSoalSekarang(soal);
    setSoalTersedia(sisaBaru);
    setGameState('playing');
  };

  const jawabSoal = (jawaban: string) => {
    if (jawabanDipilih !== null || !soalSekarang) return;
    const benar = jawaban === soalSekarang.jawabanBenar;
    setJawabanDipilih(jawaban);
    setIsBenar(benar);
    setFeedbackAnim(benar ? 'animate-bounce text-emerald-500 scale-110' : 'animate-shake text-rose-500');

    if (benar) {
      if (mode === 'giliran') {
        setSkorIndividu((prev) => ({ ...prev, [anakTerpilih]: (prev[anakTerpilih] || 0) + 1 }));
      } else {
        setSkorKolektif((prev) => prev + 1);
      }
      autoTimer.current = window.setTimeout(() => {
        lanjutkanGame();
      }, 2000);
    }
  };

  const lanjutkanGame = () => {
    if (autoTimer.current !== null) {
      clearTimeout(autoTimer.current);
      autoTimer.current = null;
    }
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
      if (soalTerjawab + 1 < totalSoal) {
        setSoalTerjawab((prev) => prev + 1);
        const { soal, sisaBaru } = ambilSoalAcak(soalTersedia);
        setSoalSekarang(soal);
        setSoalTersedia(sisaBaru);
      } else {
        setGameState('result');
      }
    }
  };

  const resetGame = () => {
    if (autoTimer.current !== null) {
      clearTimeout(autoTimer.current);
      autoTimer.current = null;
    }
    if (mode === 'kode' && kode) {
      const paket = PAKET_SOAL[kode];
      if (paket) {
        const idPaket = paket.map((s) => s.id);
        setSoalTersedia(idPaket);
        const { soal, sisaBaru } = ambilSoalAcak(idPaket);
        setSoalSekarang(soal);
        setSoalTersedia(sisaBaru);
        setSoalTerjawab(0);
        setSkorKolektif(0);
        setJawabanDipilih(null);
        setIsBenar(null);
        setFeedbackAnim('');
        setGameState('playing');
        return;
      }
    }
    setGameState('home');
    setMode(null);
    setKode(null);
    setDaftarAnak([]);
    setSkorIndividu({});
    setAnakBelumMaju([]);
    setJawabanDipilih(null);
  };

  return {
    mode,
    kode,
    gameState,
    daftarAnak,
    inputNama,
    setInputNama,
    anakBelumMaju,
    anakTerpilih,
    skorIndividu,
    skorKolektif,
    soalSekarang,
    soalTerjawab,
    totalSoal,
    gachaNameDisplay,
    isSpinning,
    hasSpun,
    jawabanDipilih,
    isBenar,
    feedbackAnim,
    handlePilihMode,
    pilihKode,
    tambahAnak,
    mulaiGiliran,
    putarGacha,
    masukKeSoalGiliran,
    jawabSoal,
    lanjutSoal: lanjutkanGame,
    resetGame,
  };
}