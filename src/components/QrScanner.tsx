import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { CameraOff, X } from 'lucide-react';

interface Props {
  onKode: (kode: string) => boolean;
  onBatal: () => void;
}

export default function QrScanner({ onKode, onBatal }: Props) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState('');
  const [pemindaian, setPemindaian] = useState(false);

  useEffect(() => {
    const scanner = new Html5Qrcode('qr-reader');
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 260, height: 260 } },
        (decodedText) => {
          let kode = decodedText;
          try {
            const url = new URL(decodedText);
            kode = url.searchParams.get('kode') ?? decodedText;
          } catch {
            // bukan URL, pakai teks polos (mis. "SET-A")
          }
          kode = kode.trim().toUpperCase();
          if (!pemindaian && onKode(kode)) {
            setPemindaian(true);
            scanner.stop().then(() => scanner.clear()).catch(() => {});
          }
        },
        () => {}
      )
      .catch((err: unknown) => {
        setError(
          'Kamera gak bisa dibuka. Coba izinkan akses kamera, atau ketik kodenya manual.'
        );
        console.error(err);
      });

    return () => {
      scanner
        .stop()
        .then(() => scanner.clear())
        .catch(() => {});
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/95 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm text-center">
        <p className="text-white font-black text-xl md:text-2xl mb-1">Scan Kode QR</p>
        <p className="text-slate-400 text-sm font-bold mb-5">Arahkan kamera ke kartu QR</p>

        <div className="bg-slate-800 rounded-3xl overflow-hidden relative border-4 border-white/20">
          <div id="qr-reader" className="[&_video]:!rounded-3xl" />
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/90 p-6">
              <CameraOff className="w-12 h-12 text-rose-400" />
              <p className="text-white font-bold text-sm leading-relaxed">{error}</p>
            </div>
          )}
        </div>

        <button
          onClick={onBatal}
          className="mt-6 w-full py-4 bg-white text-slate-800 font-black text-lg rounded-2xl hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <X className="w-5 h-5" /> Batal
        </button>
      </div>
    </div>
  );
}