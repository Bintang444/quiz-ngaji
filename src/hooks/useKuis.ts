import { useEffect, useRef, useState } from 'react';
import type { GameState, Mode, Soal } from '../types';
import { BANK_SOAL } from '../data/soal';
import { pustakaAudio } from '../utils/audio';

const JUMLAH_SOAL_DEFAULT = 7;

export function useKuis() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [gameState, setGameState] = useState<GameState>('home');

  const [daftarAnak, setDaftarAnak] = useState<string[]>([]);
  const [inputNama, setInputNama] = useState('');
  const [anakBelumMaju, setAnakBelumMaju] = useState<string[]>([]);
  const [anakTerpilih, setAnakTerpilih] = useState('');
  const [gachaNameDisplay, setGachaNameDisplay] = useState('???');
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const [soalTersedia, setSoalTersedia] = useState<number[]>([]);
  const [soalSekarang, setSoalSekarang] = useState<Soal | null>(null);
  const [soalTerjawab, setSoalTerjawab] = useState(0);
  const [skorKolektif, setSkorKolektif] = useState(0);
  const [jawabanDipilih, setJawabanDipilih] = useState<string | null>(null);
  const [isBenar, setIsBenar] = useState<boolean | null>(null);
  const [feedbackAnim, setFeedbackAnim] = useState('');
  const [totalSoal, setTotalSoal] = useState(JUMLAH_SOAL_DEFAULT);
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
    const pool = sisaSoal.length === 0 ? BANK_SOAL.map((s) => s.id) : sisaSoal;
    const idTerpilih = pool[Math.floor(Math.random() * pool.length)];
    return {
      soal: BANK_SOAL.find((s) => s.id === idTerpilih)!,
      sisaBaru: pool.filter((id) => id !== idTerpilih),
    };
  };

  const handlePilihMode = (selectedMode: Mode, jumlahSoal: number = JUMLAH_SOAL_DEFAULT) => {
    setMode(selectedMode);
    const semuaIdSoal = BANK_SOAL.map((s) => s.id);
    setSoalTersedia(semuaIdSoal);

    if (selectedMode === 'giliran') {
      setGameState('setup');
      setDaftarAnak([]);
    } else {
      setTotalSoal(Math.min(Math.max(jumlahSoal, 1), BANK_SOAL.length));
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
      setSkorKolektif((prev) => prev + 1);
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
    setGameState('home');
    setMode(null);
    setDaftarAnak([]);
    setAnakBelumMaju([]);
    setJawabanDipilih(null);
  };

  return {
    mode,
    gameState,
    daftarAnak,
    inputNama,
    setInputNama,
    anakBelumMaju,
    anakTerpilih,
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
    tambahAnak,
    mulaiGiliran,
    putarGacha,
    masukKeSoalGiliran,
    jawabSoal,
    lanjutSoal: lanjutkanGame,
    resetGame,
  };
}