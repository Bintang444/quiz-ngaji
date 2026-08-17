import { useEffect, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { useKuis } from './hooks/useKuis';
import { pustakaAudio } from './utils/audio';
import HomeScreen from './components/HomeScreen';
import SetupGiliranScreen from './components/SetupGiliranScreen';
import GachaScreen from './components/GachaScreen';
import PlayingScreen from './components/PlayingScreen';
import ResultScreen from './components/ResultScreen';

export default function App() {
  const kuis = useKuis();
  const [musikOn, setMusikOn] = useState(true);

  useEffect(() => {
    const startMusic = () => pustakaAudio.mulaiMusik();
    window.addEventListener('pointerdown', startMusic, { once: true });
    return () => window.removeEventListener('pointerdown', startMusic);
  }, []);

  const toggleMusik = () => {
    setMusikOn(pustakaAudio.toggleMusik());
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden relative selection:bg-blue-200">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-300/20 rounded-full mix-blend-multiply blur-[80px] animate-pulse" />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-sky-300/20 rounded-full mix-blend-multiply blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-pink-300/20 rounded-full mix-blend-multiply blur-[80px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <button
        onClick={toggleMusik}
        title={musikOn ? 'Matikan musik' : 'Nyalakan musik'}
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/95 backdrop-blur border-4 border-slate-100 shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
      >
        {musikOn ? <Music className="w-6 h-6 text-blue-600" /> : <VolumeX className="w-6 h-6 text-slate-400" />}
      </button>

      <div className="relative z-10 w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        {kuis.gameState === 'home' && <HomeScreen onPilihMode={kuis.handlePilihMode} />}
        {kuis.gameState === 'setup' && (
          <SetupGiliranScreen
            daftarAnak={kuis.daftarAnak}
            inputNama={kuis.inputNama}
            setInputNama={kuis.setInputNama}
            tambahAnak={kuis.tambahAnak}
            mulaiGiliran={kuis.mulaiGiliran}
            resetGame={kuis.resetGame}
          />
        )}
        {kuis.gameState === 'gacha' && (
          <GachaScreen
            gachaNameDisplay={kuis.gachaNameDisplay}
            isSpinning={kuis.isSpinning}
            hasSpun={kuis.hasSpun}
            putarGacha={kuis.putarGacha}
            masukKeSoalGiliran={kuis.masukKeSoalGiliran}
          />
        )}
        {kuis.gameState === 'playing' && kuis.soalSekarang && (
          <PlayingScreen
            mode={kuis.mode}
            soalSekarang={kuis.soalSekarang}
            anakTerpilih={kuis.anakTerpilih}
            daftarAnak={kuis.daftarAnak}
            anakBelumMaju={kuis.anakBelumMaju}
            soalTerjawab={kuis.soalTerjawab}
            skorKolektif={kuis.skorKolektif}
            skorIndividu={kuis.skorIndividu}
            jawabanDipilih={kuis.jawabanDipilih}
            isBenar={kuis.isBenar}
            feedbackAnim={kuis.feedbackAnim}
            jawabSoal={kuis.jawabSoal}
            lanjutSoal={kuis.lanjutSoal}
            resetGame={kuis.resetGame}
          />
        )}
        {kuis.gameState === 'result' && (
          <ResultScreen
            mode={kuis.mode}
            skorIndividu={kuis.skorIndividu}
            skorKolektif={kuis.skorKolektif}
            resetGame={kuis.resetGame}
          />
        )}
      </div>
    </div>
  );
}