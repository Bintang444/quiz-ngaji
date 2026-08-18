export type Mode = 'giliran' | 'rame-rame' | 'kode';

export type GameState = 'home' | 'setup' | 'gacha' | 'playing' | 'result';

export interface Soal {
  id: number;
  emoji: string;
  pertanyaan: string;
  pilihan: string[];
  jawabanBenar: string;
  bgColor: string;
}