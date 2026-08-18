export type Materi = 'semua' | 'malaikat' | 'nabi-adam' | 'nabi-nuh' | 'nabi-ibrahim' | 'nabi-ismail' | 'nabi-ishaq' | 'nabi-yaqub' | 'nabi-yusuf';

interface MateriDef {
  id: Materi;
  label: string;
  ranges: [number, number][];
}

export const MATERI_DEFINITIONS: MateriDef[] = [
  { id: 'semua', label: 'Semua Materi', ranges: [] },
  { id: 'malaikat', label: 'Malaikat & Aqidah', ranges: [[1, 16], [51, 62]] },
  { id: 'nabi-adam', label: 'Nabi Adam', ranges: [[17, 21], [63, 67]] },
  { id: 'nabi-nuh', label: 'Nabi Nuh', ranges: [[22, 26], [68, 72]] },
  { id: 'nabi-ibrahim', label: 'Nabi Ibrahim', ranges: [[27, 32], [73, 78]] },
  { id: 'nabi-ismail', label: 'Nabi Ismail', ranges: [[33, 36], [79, 82]] },
  { id: 'nabi-ishaq', label: 'Nabi Ishaq', ranges: [[37, 39], [83, 85]] },
  { id: 'nabi-yaqub', label: "Nabi Ya'qub", ranges: [[40, 42], [86, 88]] },
  { id: 'nabi-yusuf', label: 'Nabi Yusuf', ranges: [[43, 50], [89, 100]] },
];

export function soalUntukMateri(materi: Materi, semuaId: number[]): number[] {
  const def = MATERI_DEFINITIONS.find((d) => d.id === materi);
  if (!def || def.ranges.length === 0) return semuaId;
  return semuaId.filter((id) => def.ranges.some(([a, b]) => id >= a && id <= b));
}

export function jumlahMateri(materi: Materi): number {
  const def = MATERI_DEFINITIONS.find((d) => d.id === materi)!;
  if (def.ranges.length === 0) return 0;
  return def.ranges.reduce((sum, [a, b]) => sum + (b - a + 1), 0);
}