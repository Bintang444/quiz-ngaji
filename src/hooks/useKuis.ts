import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import type { GameState, Mode, Rarity, Soal } from '../types';
import { BANK_SOAL } from '../data/soal';
import { soalUntukMateri } from '../data/materi';
import type { Materi } from '../data/materi';
import { pustakaAudio } from '../utils/audio';

const JUMLAH_SOAL_DEFAULT = 7;

function acakDaftar(arr: string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pilihRarityBenar(): Rarity {
  const rand = Math.random();
  if (rand < 0.1) return 'ur';
  if (rand < 0.35) return 'sr';
  return 'r';
}

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
  const [bintangRarity, setBintangRarity] = useState<Rarity | null>(null);
  const [materi, setMateri] = useState<Materi>('semua');
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
    const poolMateri = soalUntukMateri(materi, BANK_SOAL.map((s) => s.id));
    const pool = sisaSoal.length === 0 ? poolMateri : sisaSoal;
    const idTerpilih = pool[Math.floor(Math.random() * pool.length)];
    return {
      soal: BANK_SOAL.find((s) => s.id === idTerpilih)!,
      sisaBaru: pool.filter((id) => id !== idTerpilih),
    };
  };

  const handlePilihMode = (selectedMode: Mode, jumlahSoal: number = JUMLAH_SOAL_DEFAULT, materiPilihan: Materi = 'semua') => {
    setMode(selectedMode);
    setMateri(materiPilihan);

    if (selectedMode === 'giliran') {
      setGameState('setup');
      setDaftarAnak([]);
    } else {
      const poolMateri = soalUntukMateri(materiPilihan, BANK_SOAL.map((s) => s.id));
      setTotalSoal(Math.min(Math.max(jumlahSoal, 1), poolMateri.length));
      setSoalTersedia(poolMateri);
      const { soal, sisaBaru } = ambilSoalAcak(poolMateri);
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
      setAnakBelumMaju(acakDaftar(daftarAnak));
      setSoalTersedia(soalUntukMateri(materi, BANK_SOAL.map((s) => s.id)));
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
      const randomDummy = anakBelumMaju[Math.floor(Math.random() * anakBelumMaju.length)];
      setGachaNameDisplay(randomDummy);
      pustakaAudio.tick();
      counter++;

      if (counter > 25) {
        clearInterval(spinInterval);
        const winner = anakBelumMaju[0];
        setAnakTerpilih(winner);
        setGachaNameDisplay(winner);
        setIsSpinning(false);
        setAnakBelumMaju((prev) => prev.slice(1));
        pustakaAudio.selesaiPutar();

        const flash = document.getElementById('flashBang');
        if (flash) {
          flash.classList.add('is-flashing');
          setTimeout(() => flash.classList.remove('is-flashing'), 250);
        }
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#a855f7', '#ffdf00', '#f59e0b'],
        });
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
      setBintangRarity(pilihRarityBenar());
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
    setBintangRarity(null);

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

  const lewatiGiliran = () => {
    lanjutkanGame();
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
    setBintangRarity(null);
    setMateri('semua');
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
    materi,
    setMateri,
    soalSekarang,
    soalTerjawab,
    totalSoal,
    gachaNameDisplay,
    isSpinning,
    hasSpun,
    bintangRarity,
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
    lewatiGiliran,
    resetGame,
  };
}